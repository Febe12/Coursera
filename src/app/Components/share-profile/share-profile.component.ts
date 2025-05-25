import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-share-profile',
  templateUrl: './share-profile.component.html',
  styleUrls: ['./share-profile.component.scss']
})
export class ShareProfileComponent {
 
  profileLink = 'https://www.coursera.org/user/fa60d1b0ceacd0af78567dcd3c23 ';

  @ViewChild('profileLinkInput') profileLinkInput!: ElementRef;


  copyLink() {
    const link = this.profileLinkInput.nativeElement.value.trim(); 

    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Profile link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
        alert('Failed to copy link. Please try again.');
      });
  }
}