import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Formulas } from './formulas';
import { Utils } from './utils';

@Component({
  selector: 'app-module2',
  templateUrl: './module2.component.html',
  styleUrls: ['./module2.component.scss']
})
export class Module2Component implements OnInit {
  medianForm: FormGroup;
  arithmeticForm: FormGroup;
  minimumSampleSizeForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.medianForm = new FormGroup({
      numbersToGenerateResults: new FormControl(null, Validators.required),
      generateMedian: new FormControl(null)
    });

    this.arithmeticForm = new FormGroup({
      numbersToGenerateResults: new FormControl(null, Validators.required),
      generateMedian: new FormControl(null),
      generateArithmeticAverage: new FormControl(null),
      generateMode: new FormControl(null)
    });

    this.minimumSampleSizeForm = new FormGroup({
      confidenceInterval: new FormControl(null, Validators.required),
      varianceOfDistribution: new FormControl(null, Validators.required),
      maxError: new FormControl(null, Validators.required),
      generateMinimumSampleSize: new FormControl(null)
    });
  }

  setMedianInput(inputValue:string, output:any) {
    let numbersToGenerateMedianArray: Array<number> = [],
        calculatedMedian: number = null;
    if (inputValue) {
        numbersToGenerateMedianArray = Utils.generateArrayFromCommaSeparatedString(inputValue);
        calculatedMedian = Formulas.calculateMedian(numbersToGenerateMedianArray);
        isNaN(calculatedMedian) ? output.setValue('data is incorrect') : output.setValue(calculatedMedian);
    }
  }

  setArithmeticInput(inputValue:string, output:any) {
    let numbersToGenerateArithmeticAverageArray: Array<number> = [],
        calculatedArithmeticAverage: number = null;
    if (inputValue) {
        numbersToGenerateArithmeticAverageArray = Utils.generateArrayFromCommaSeparatedString(inputValue);
        calculatedArithmeticAverage = Formulas.calculateArithmeticAverage(numbersToGenerateArithmeticAverageArray);
        isNaN(calculatedArithmeticAverage) ? output.setValue('data is incorrect') : output.setValue(calculatedArithmeticAverage);
    }
  }

  setModeInput(inputValue:string, output:any) {
    let numbersToGenerateModeArray: Array<number> = [],
        calculatedMode: number = null;
    if (inputValue) {
        numbersToGenerateModeArray = Utils.generateArrayFromCommaSeparatedString(inputValue);
        calculatedMode = Formulas.calculateMode(numbersToGenerateModeArray);
        isNaN(calculatedMode) ? output.setValue('data is incorrect') : output.setValue(calculatedMode);
    }
  }

  onMedianFormSubmit(): void {
    this.setMedianInput(this.medianForm.get('numbersToGenerateResults').value, this.medianForm.get('generateMedian'));   
  }

  onArithmeticFormSubmit(): void {
    this.setMedianInput(this.arithmeticForm.get('numbersToGenerateResults').value, this.arithmeticForm.get('generateMedian'));   
    this.setArithmeticInput(this.arithmeticForm.get('numbersToGenerateResults').value, this.arithmeticForm.get('generateArithmeticAverage'));
    this.setModeInput(this.arithmeticForm.get('numbersToGenerateResults').value, this.arithmeticForm.get('generateMode'));    
  }

  onminimumSampleSizeFormSubmit(): void {
    const confidenceIntervalInputValue:string = this.minimumSampleSizeForm.get('confidenceInterval').value,
          varianceOfDistributionInputValue:string = this.minimumSampleSizeForm.get('varianceOfDistribution').value,
          maxErrorInputValue:string = this.minimumSampleSizeForm.get('maxError').value;
    console.log(confidenceIntervalInputValue);
    let generateMinimumSampleSizeINput = this.minimumSampleSizeForm.get('generateMinimumSampleSize');
    if (confidenceIntervalInputValue && varianceOfDistributionInputValue && maxErrorInputValue) {
      let calculateSampleSize = Formulas.calculateMinimumSampleSize(parseFloat(confidenceIntervalInputValue), parseFloat(varianceOfDistributionInputValue), parseFloat(maxErrorInputValue));
      isNaN(calculateSampleSize) ? generateMinimumSampleSizeINput.setValue('data is incorrect') : generateMinimumSampleSizeINput.setValue(calculateSampleSize);
    }

  }

}


