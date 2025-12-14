import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  title = "Tech News Hub";
  darkMode = false;
  private router = inject(Router);
  mobileMenuOpen = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle("dark-mode", this.darkMode);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.mobileMenuOpen = false;
  }

  onSearch(query: string) {
    if (query.trim()) {
      this.router.navigate(["/search"], { queryParams: { q: query } });
      this.mobileMenuOpen = false;
    }
  }
}
