import { Component, OnInit } from '@angular/core';
import { StockService, Stock } from '../services/stock.service';



@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stocks: Stock[] = [];
  form: Stock = this.resetStock();
  query: string = '';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.getAllStocks();
  }

  resetStock(): Stock {
    return {
      bookTitle: '',
      author: '',
      quantity: 0,
      available: 0,
      reserved: 0
    };
  }

  getAllStocks(): void {
    this.stockService.getAllStocks().subscribe(data => this.stocks = data);
  }

  submitForm(): void {
    if (this.form.id) {
      this.stockService.updateStock(this.form.id, this.form).subscribe(() => {
        this.getAllStocks();
        this.form = this.resetStock();
      });
    } else {
      this.stockService.createStock(this.form).subscribe(() => {
        this.getAllStocks();
        this.form = this.resetStock();
      });
    }
  }

  editStock(stock: Stock): void {
    this.form = { ...stock };
  }

  deleteStock(id: number): void {
    this.stockService.deleteStock(id).subscribe(() => this.getAllStocks());
  }

  resetForm(): void {
    this.form = this.resetStock();
  }

  downloadReport(): void {
    this.stockService.downloadPdfReport().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'stock-report.pdf';
      link.click();
    });
  }

  search(): void {
    this.stockService.searchBooks(this.query).subscribe(result => {
      console.log('Google Books Search Result:', result);
      alert('Search result logged in console.');
    });
  }
}
