import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  public static showTemplate: boolean = true;
  visibleSidebar = false;

  private themeDark: string = 'assets/css/themes/dark/theme.css';
  private themeLight: string = 'assets/css/themes/light/theme.css';

  isDark: boolean = false;

  constructor() { }

  ngOnInit(): void {
    let themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
    this.isDark = themeLink.href.indexOf(this.themeDark) >= 0;
    if (sessionStorage.getItem('isDark') && sessionStorage.getItem('isDark') != this.isDark + '') {
      this.changeTheme();
    }
    else {
      sessionStorage.setItem('isDark', this.isDark + '');
    }
  }

  get getShowTemplate(): boolean {
    return sessionStorage.getItem('tRcr7Ssn') != null;
  }

  openCloseSideBar(event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.visibleSidebar = !this.visibleSidebar;
  }

  changeTheme(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    let themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
    if (themeLink.href.indexOf(this.themeDark) >= 0) {
      themeLink.href = this.themeLight;
    }
    else {
      themeLink.href = this.themeDark;
    }
    this.isDark = !this.isDark;
    sessionStorage.setItem('isDark', this.isDark + '');
  }

  pesquisarMenu(){}
}
