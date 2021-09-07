import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  get HumanName() {
    return "^[a-zA-Z0-9-.'\\s]*$"; // only alphanumic and space . '
   // return "^[a-zA-Z]+[\-'\s]?[a-zA-Z0-9]+$";
  }

  get Email() {
    return '^.+@.+\\..+$'; // contains @ and . with text surrounding
  }

  get Phone() {
    //return '^[7-9][0-9]{9}$'; // max 20 chars, numbers and -
    return '^[1-9][0-9]{9}'; //accept only ten digits
  } 
  get pincode() {
    
    return '^[1-9][0-9][0-9][0-9][0-9][0-9]$'; //accept pincode with 6 digits with space after 3
  } 
  get pancard() {
    
    return '^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$'; //Valid Pan cardMatches	 ASDGF1234A
  } 

  get Date() {
    return '^[0-9]{2}-[0-9]{2}-[0-9]{4}$'; // mm-dd-yyyy, all numbers
  }

  get Aadhar() {
    return '[0-9]{12}';
  }
  get chequeNumber() {
    return '[0-9]{6}';
  }

  get HexCodePattern(){
    return '^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
  }
  getZip(countryCode = 'US') {
    switch (countryCode) {
      case 'CA':
        return '^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$';
      case 'US':
        return '^[0-9]{5}$'; // US zip - five numbers
    }
  }
}
