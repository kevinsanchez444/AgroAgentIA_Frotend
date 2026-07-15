import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cultivo } from '../../models/cultivo';

@Component({
  selector: 'app-agentes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agentes.html',
  styleUrls: ['./agentes.css']
})
export class AgentesComponent implements OnInit {

  cultivos: Cultivo[] = [];
  cargandoCultivos = true;
  error = '';

  cultivoSeleccionado: Cultivo | null = null;
  cargandoRecomendacion = false;
  recomendacion = '';

  private apiCultivos = 'http://localhost:8080/api/cultivos';
  private apiAgente = 'http://localhost:8080/api/agente';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCultivos();
  }

  cargarCultivos(): void {
    this.cargandoCultivos = true;
    this.error = '';
    this.cdr.detectChanges();

    this.http.get<any[]>(this.apiCultivos).subscribe({
      next: (respuesta) => {
        console.log('Respuesta cultivos recibida:', respuesta);
        const lista = Array.isArray(respuesta) ? respuesta : [];
        this.cultivos = lista.map((item: any) => ({
          idCultivo: item.idCultivo ?? item.id,
          nombreLote: item.nombreLote ?? item.nombre_lote ?? '',
          municipio: item.municipio ?? '',
          departamento: item.departamento ?? '',
          hectareas: Number(item.hectareas ?? 0),
          cantidadArboles: Number(item.cantidadArboles ?? 0),
          fechaSiembra: item.fechaSiembra ?? '',
          variedad: item.variedad ?? '',
          estado: item.estado ?? ''
        }));
        this.cargandoCultivos = false;
        this.cdr.detectChanges();
        console.log('Cultivos procesados:', this.cultivos.length, this.cultivos);
      },
      error: (err) => {
        console.error('Error cargando cultivos:', err);
        this.error = 'No se pudieron cargar los cultivos. Verifique que el backend esté funcionando.';
        this.cargandoCultivos = false;
        this.cdr.detectChanges();
      }
    });
  }

  abrirRecomendacion(cultivo: Cultivo): void {
    this.cultivoSeleccionado = cultivo;
    this.recomendacion = '';
    this.error = '';
    this.cargandoRecomendacion = true;
    this.cdr.detectChanges();

    const body = {
      ciudad: cultivo.municipio || 'Colombia',
      lote: cultivo.nombreLote || 'Lote',
      hectareas: cultivo.hectareas || 1,
      edadCultivo: 1
    };

    const url = `${this.apiAgente}/recomendacion/cultivo/${cultivo.idCultivo}`;

    this.http.post<any>(url, body).subscribe({
      next: (resp) => {
        this.recomendacion = resp.recomendacion || 'Sin recomendación generada.';
        this.cargandoRecomendacion = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error generando recomendación:', err);
        this.error = 'Error al generar la recomendación. Intente de nuevo.';
        this.cargandoRecomendacion = false;
        this.cdr.detectChanges();
      }
    });
  }

  cerrarModal(): void {
    this.cultivoSeleccionado = null;
    this.recomendacion = '';
    this.error = '';
    this.cargandoRecomendacion = false;
    this.cdr.detectChanges();
  }

  irDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}