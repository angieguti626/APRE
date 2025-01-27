import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPerformanceByRegionComponent } from './agent-performance-by-region.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgentPerformanceByRegionComponent', () => {
  let component: AgentPerformanceByRegionComponent;
  let fixture: ComponentFixture<AgentPerformanceByRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AgentPerformanceByRegionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentPerformanceByRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //"Agent Performance By Region" title is displayed.
  it('should display the title "Agent Performance By Region"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');
    
    //asserts 
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Agent Performance By Region');
  });

  // Test that the regionForm is initialized with null values.
  it('should initialize the regionForm with null values', () => {
    const regionControl = component.regionForm.controls['region'];

    // asserts
    expect(regionControl.value).toBeNull();
    expect(regionControl.valid).toBeFalse();
  });

  // Form should not sumbit if no region is selected
  it('should not submit the form if no region is selected', () => {
    spyOn(component, 'onSubmit').and.callThrough();

    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('.form__actions button');
    submitButton.click();

    //asserts
    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.regionForm.valid).toBeFalse();
  });
});

export { AgentPerformanceByRegionComponent };
