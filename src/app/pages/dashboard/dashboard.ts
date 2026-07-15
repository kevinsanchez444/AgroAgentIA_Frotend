import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
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

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard(): void {

    this.dashboardService.obtenerDatos().subscribe({

      next: (data: any) => {

        console.log(data);

        this.cultivos = Number(data.cultivos);
        this.recomendaciones = Number(data.recomendaciones);
        this.totalArboles = Number(data.totalArboles);
        this.municipios = Number(data.municipios);

        this.ultimoLote = data.ultimoLote;
        this.ultimoEstado = data.ultimoEstado;

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  irRegistrarCultivo() {

    this.router.navigate(['/registrar-cultivo']);

  }

}