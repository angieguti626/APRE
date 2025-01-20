import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SalesBySalespersonComponent } from './sales-by-salesperson.component';

describe('SalesBySalespersonComponent', () => {
  let component: SalesBySalespersonComponent;
  let fixture: ComponentFixture<SalesBySalespersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SalesBySalespersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesBySalespersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   // See the header displayed
  it('should display header "Sales Data By Sales Person"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');
    
    // asserts 
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Sales Data By Sales Person');
  });  
});
