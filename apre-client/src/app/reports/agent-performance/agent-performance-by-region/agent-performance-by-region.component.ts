import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChartComponent } from '../../../shared/chart/chart.component';

@Component({
  selector: 'app-agent-performance-by-region',
  standalone: true,
  imports: [ReactiveFormsModule, ChartComponent],
  template: `
  <h1>Agent Performance By Region</h1>
    <div class="region-container">
      <form class="form" [formGroup]="regionForm" (ngSubmit)="onSubmit()">
        <div class="form__group">
          <label class="label" for="region">Region</label>
          <select class="select" formControlName="region" id="region" name="region">
            @for(region of regions; track region) {
              <option value="{{ region }}">{{ region }}</option>
            }
          </select>
        </div>
         <div class="form__actions">
          <button class="button button--primary" type="submit">Submit</button>
        </div>
      </form>

      <br />
      @if (showChart) {
        <div class="card chart-card">
          <app-chart
            [type]="'bar'"
            [label]="'Agent Performance'"
            [data]="region"
            [labels]="agents">
          </app-chart>
        </div>
      }
    </div>
  `,
  styles: `
    .region-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .form, .chart-card {
      width: 50%;
      margin: 20px 0;
    }
  `
})
export class AgentPerformanceByRegionComponent implements AfterViewInit {
  regions: string[] = []; // Initially empty
  agents: string[] = []; // Initially empty
  showChart: boolean = false; // Initially hidden

  regionForm = this.fb.group({
    region: [null, Validators.compose([Validators.required])]
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.http.get(`${environment.apiBaseUrl}/reports/agent-performance/agent-performance-by-region`).subscribe({
      next: (data: any) => {
        this.regions = data;
      },
      error: (err) => {
        console.error('Error fetching regions:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    // No need to create chart here, it will be handled by ChartComponent
  }

  onSubmit() {
    const region = this.regionForm.controls['region'].value;

    // Check if there is any value in the region field
    if(region) {
      this.http.get(`${environment.apiBaseUrl}/reports/agent-performance/agent-performance-by-region/${region}`).subscribe({
        next: (data: any) => {
          this.regions = data[0].region;
          this.agents = data[0].agents;
        },
        error: (error: any) => {
          console.error('Error fetching agent performance by region data:', error);
        },
        complete: () => {
          this.showChart = true; // Show chart after fetching data
        }
      });
    } else {
      alert('Please select a region.');
    }
  }

}