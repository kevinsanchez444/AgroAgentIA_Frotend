import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';
import { Cultivo } from '../../models/cultivo';
import { CultivoService } from '../../services/cultivo.service';
import { DashboardService } from '../../services/dashboard.service';
import { RecomendacionService } from '../../services/recomendacion.service';
import { Recomendacion } from '../../models/recomendacion';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  cultivos = 0;
  recomendaciones = 0;
  totalArboles = 0;
  municipios = 0;

  ultimoLote = '';
  ultimoEstado = '';

  historial: Recomendacion[] = [];
  mostrarRecomendaciones = false;
  cargandoDashboard = false;
  cargandoRecomendaciones = false;
  errorDashboard = '';
  errorRecomendaciones = '';

  constructor(
    private dashboardService: DashboardService,
    private cultivoService: CultivoService,
    private recomendacionService: RecomendacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDashboard();
    this.cargarDashboardDesdeListas();
  }

  cargarDashboard(): void {
    this.cargandoDashboard = true;
    this.dashboardService.obtenerDatos()
      .pipe(
        timeout(8000),
        finalize(() => this.cargandoDashboard = false)
      )
      .subscribe({
      next: (data: any) => {
        this.cultivos = this.numero(data?.cultivos ?? data?.totalCultivos);
        this.recomendaciones = this.numero(data?.recomendaciones ?? data?.totalRecomendaciones);
        this.totalArboles = this.numero(data?.totalArboles ?? data?.arboles);
        this.municipios = this.numero(data?.municipios ?? data?.totalMunicipios);
        this.ultimoLote = data?.ultimoLote ?? data?.ultimoCultivo?.nombreLote ?? this.ultimoLote;
        this.ultimoEstado = data?.ultimoEstado ?? data?.ultimoCultivo?.estado ?? this.ultimoEstado;
      },
      error: (err) => {
        console.error(err);
        this.errorDashboard = 'No fue posible cargar el resumen del dashboard. Se muestran los datos disponibles.';
      }
    });
  }

  cargarDashboardDesdeListas(): void {
    forkJoin({
      cultivos: this.cultivoService.listar().pipe(
        timeout(8000),
        catchError((err) => {
          console.error(err);
          this.errorDashboard = 'No fue posible cargar los cultivos para actualizar el dashboard.';
          return of([]);
        })
      ),
      recomendaciones: this.recomendacionService.listar().pipe(
        timeout(8000),
        catchError((err) => {
          console.error(err);
          return of([]);
        })
      )
    }).subscribe(({ cultivos, recomendaciones }) => {
      if (cultivos.length > 0) {
        this.aplicarResumenCultivos(cultivos);
      }

      this.recomendaciones = recomendaciones.length || this.recomendaciones;
    });
  }

  irRegistrarCultivo(): void {
    this.router.navigate(['/registrar-cultivo']);
  }

  irCultivos(): void {
    this.router.navigate(['/agentes']);
  }

  verRecomendaciones(): void {
    this.mostrarRecomendaciones = !this.mostrarRecomendaciones;
    this.errorRecomendaciones = '';

    if (!this.mostrarRecomendaciones || this.historial.length > 0) {
      return;
    }

    this.cargandoRecomendaciones = true;
    this.recomendacionService.listar()
      .pipe(
        timeout(8000),
        finalize(() => this.cargandoRecomendaciones = false)
      )
      .subscribe({
      next: (data) => {
        this.historial = data;
      },
      error: (err) => {
        console.error(err);
        this.errorRecomendaciones = 'No fue posible cargar las recomendaciones guardadas.';
      }
    });
  }

  private aplicarResumenCultivos(cultivos: Cultivo[]): void {
    const ultimoCultivo = cultivos[cultivos.length - 1];
    const municipios = new Set(
      cultivos
        .map((cultivo) => (cultivo.municipio || '').trim().toLowerCase())
        .filter(Boolean)
    );

    this.cultivos = cultivos.length;
    this.totalArboles = cultivos.reduce(
      (total, cultivo) => total + this.numero(cultivo.cantidadArboles),
      0
    );
    this.municipios = municipios.size;
    this.ultimoLote = ultimoCultivo?.nombreLote ?? '';
    this.ultimoEstado = ultimoCultivo?.estado ?? '';
  }

  private numero(valor: unknown): number {
    return Number(valor) || 0;
  }

}
