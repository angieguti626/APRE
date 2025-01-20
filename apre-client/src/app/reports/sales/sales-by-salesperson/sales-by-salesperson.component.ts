import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TableComponent } from './../../../shared/table/table.component';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales-by-salesperson',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule],
  template: `
  <h1>Sales Data By Sales Person</h1>
  <div class="salesperson-container">

    <div class="card table-card">
    <!-- Set the headers and data to be displayed in the table -->
      <app-table
        [title]="'Sales By Sales Person'"
        [data]="salespersons"
        [recordsPerPage]="25"
        [headers]="['salesperson','region', 'product', 'amount']" 
        [sortableColumns]="['salesperson','region', 'product', 'amount']"  
         >
      </app-table>
    </div>
  </div>
  `,
  styles: `
    .salesperson-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .form, .chart-card {
      width: 50%;
      margin: 20px 0;
      padding: 10px;
    }

    app-table {
      padding: 50px;
    }
    `
})
export class SalesBySalespersonComponent {
  salespersons: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get(`${environment.apiBaseUrl}/reports/sales/sales-by-salesperson`).subscribe({
      next: (data: any) => {
        this.salespersons = data; // Set the salespersons data to the data parameter.
        console.log(this.salespersons); // Sale persons data in console.
      },
      error: (err) => {
        console.error('Error fetching sales data per person', err); //Throw an error if sales data is not fetched.
      }
    });
  }
}
