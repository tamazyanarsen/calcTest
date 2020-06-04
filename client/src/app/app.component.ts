import { Component, ViewChild } from '@angular/core';
import { CalcService } from './services/calc.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    expr: string;
    start: number;
    end: number;

    @ViewChild('canvas', { static: true }) canvas: HTMLCanvasElement;

    constructor(private calc: CalcService) {
    }

    calculate() {
        this.calc.calc({
            expr: this.expr,
            start: this.start,
            end: this.end,
            width: 500,
            height: 500
        }, e => this.plot(e, this.end - this.start));
    }

    plot(data: [{ x: number, y: number }], range) {
        console.log('get data', data);
        const cnv: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('plot');
        const height = 500;
        const width = 500;
        const scaleX = width / range;
        const scaleY = height / range;
        console.log('scale:', scaleX, scaleY);
        cnv.width = width;
        cnv.height = height;
        const startX = Math.round(width / 2);
        const startY = Math.round(height / 2);
        const ctx = cnv.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.moveTo(data[0].x * scaleX + startX, startY - data[0].y * scaleY);
        data.forEach(e => {
            console.log(e.x * scaleX + startX, startY - e.y * scaleY);
            ctx.lineTo(e.x * scaleX + startX, startY - e.y * scaleY);
            // ctx.moveTo(e.x * scaleX, (start - e.y) * scaleY);
        });
        // ctx.closePath();
        // ctx.fill();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}
