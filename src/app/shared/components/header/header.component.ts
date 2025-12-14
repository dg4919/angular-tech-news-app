import { Component, inject, OnInit } from "@angular/core";
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
export class HeaderComponent implements OnInit {
  title = "Tech News Hub";
  darkMode = false;
  private router = inject(Router);
  mobileMenuOpen = false;
  private readonly THEME_KEY = 'theme-preference';

  ngOnInit() {
    // Load saved theme preference from localStorage
    try {
      const savedTheme = localStorage.getItem(this.THEME_KEY);
      if (savedTheme === 'dark') {
        this.darkMode = true;
        document.body.classList.add('dark-mode');
      } else if (savedTheme === 'light') {
        this.darkMode = false;
        document.body.classList.remove('dark-mode');
      }
    } catch (e) {
      // localStorage may not be available in SSR or private browsing mode
      console.warn('Unable to access localStorage:', e);
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle("dark-mode", this.darkMode);
    
    // Persist theme preference to localStorage
    try {
      localStorage.setItem(this.THEME_KEY, this.darkMode ? 'dark' : 'light');
    } catch (e) {
      // localStorage.setItem can fail in private browsing or when quota is exceeded
      console.warn('Unable to save theme preference:', e);
    }
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
