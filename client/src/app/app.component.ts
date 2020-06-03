import { Component } from '@angular/core';
import { CalcService } from './services/calc.service';
import * as d3 from 'd3';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    expr: string;
    start: number;
    end: number;

    constructor(private calc: CalcService) {
    }

    calculate() {
        // console.log(d3);
        this.calc.calc({ expr: this.expr, start: this.start, end: this.end }, e => this.plot(e));
    }

    plot(data: []) {
        const svg = d3.select('#line').append('svg').attr('width', 800).attr('height', 200);

        const lineFunc = d3.line()
            .x((d) => {
                return d.x;
            })
            .y((d) => {
                return d.y;
            });

        svg.append('path')
            .attr('d', lineFunc(data))
            .attr('stroke', 'black')
            .attr('fill', 'none');
    }
}
