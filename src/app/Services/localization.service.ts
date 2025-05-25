import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  private readonly LANGUAGE_KEY = 'language';

  constructor(private translate: TranslateService) {}

  // تحديث اللغة وتخزينها في localStorage
  setLanguage(lang: string) {
    localStorage.setItem(this.LANGUAGE_KEY, lang);
    this.translate.use(lang);
    
    // تغيير اتجاه الصفحة بناءً على اللغة
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  // استرجاع اللغة الحالية من localStorage
  getLanguage(): string {
    return localStorage.getItem(this.LANGUAGE_KEY) || 'en';
  }

  // تهيئة اللغة عند تحميل التطبيق
  initLanguage(): void {
    const savedLang = this.getLanguage();
    this.translate.use(savedLang);
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  }
}
