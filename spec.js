// 1. Is Navbar There - 
    // There should be 6 buttons in the navbar: Home button, Find a doctor, Services, Locations, Patients & Visitors, & MyChart.
// 2. Is Main Search There - DONE
    // There should be a search bar & a dropdown in the large container.
// 3. Search Test - 
    // When Wendy is typed into the search bar, only people with the name Wendy should appear.
// 4. First Dropdown Options - DONE
    // The first dropdown in the large container should have 2 options: Primary Care Provider & Specialist.
// 5. Specialist Selection - DONE
    // Once specialist is selected, a search bar should appear in the large container.
// 6. Primary Care Provider Selection  - 
    // Once PCP is selected, another dropdown with 12 options should appear.
// 7. "Specializes" Selection - DONE
    // Once Family Medicine has been selected, 2 dropdowns and 2 checkboxes should appear. The first dropdown, Location, should have 19 options.
// 8. Language Options - 
    // The languages dropdown should have 10 options.
// 9. Search Functionality Test - 
    // With Primary Care Provider, Family Medicine, South Jorden, Male, and Spanish selected, there should be 2 doctors listed. When on both doctor's pages, they should both match the selected criteria on the previous page.
// 10. Learn About Survey - DONE
    // When you click on learn about our survey, it should redirect to https://healthcare.utah.edu/fad/pressganey.php.
// 11. View All Doctors - DONE
    // When you click on view all doctors, it should redirect to https://healthcare.utah.edu/fad/all.php. 
// 12. Footer Links - DONE
    // The footer should contain 16 links: About Us, Academics & Research, Billing, Jobs, Giving, Maps & Directions, Newsroom, The Imagine Perfect Care Program, Referring Providers, Find an Interpreter, Patient Rights & Responsibilities, Disclaimer, Privacy Statement, DNV GL Public Information Policy Statement, Non-Discrimination Policy, & Webmaster.

const EC = protractor.ExpectedConditions;
const fadpage = 'https://healthcare.utah.edu/fad/';
const filterEl = function(css) {
    el = element.all(by.css(css)).filter(function(elem, index) {
        return elem.getText().then(function(text) {
          return text !== "" 
        });
      });
}

describe('UVU Find A Doctor Page', function() {
    it('should check that all Navbar buttons are there', function() {
        browser.get(fadpage);

        expect(element(by.className('o-nav__logo')).isPresent()).toBe(true);
        filterEl('.o-nav__link')
        expect(el.getText()).toEqual(['FIND A DOCTOR', 'SERVICES', 'LOCATIONS', 'PATIENTS & VISITORS', 'BILLING & INSURANCE', 'MY\nCHART']);
    });

    it('should check to make sure doctor search and dropdown are there', function() {
        expect(element(by.model('query')).isPresent()).toBe(true);
        expect(element(by.model('primarySwitch')).isPresent()).toBe(true);
    }); //Done

    // // it('should search for the name Wendy and only display doctors with the name Wendy', function() {
    // //     element(by.model('query')).sendKeys('Wendy')
    // //     expect(element.all(by.model(by.cssContainingText('h5', 'Wendy')).count())).toBe(4)
    // // });

    it('should check that both options are in the first dropdown', function() {
        element(by.model('primarySwitch')).click();
        allOptions = element.all(by.model('primarySwitch')).$$('option')
        expect(allOptions.getText()).toEqual(['-- Please Select --', 'Primary Care Provider', 'Specialist'])
    }); //Done

    it('should check that a search bar appears when Specialist is selected', function() {
        element(by.model('primarySwitch')).click();
        element(by.cssContainingText('option', 'Specialist')).click();
        expect(element(by.model('searchStr')).isPresent()).toBe(true)
    }); //Done

    it('should check that all options are present in the "specializes in" dropdown', function() {
        element(by.model('primarySwitch')).click();
        element(by.cssContainingText('option', 'Primary Care Provider')).click();
        element(by.model('primaryCare')).click();
        allOptions = element.all(by.model('primaryCare')).$$('option')
        expect(allOptions.getText()).toEqual([ '-- Please Select --', 'Family Medicine', 'Family Nurse Practitioner', 'General Pediatrics', 'Geriatrics', 'Internal Medicine, General', 'Internal Medicine/Pediatrics', 'OB/GYN Nurse Practitioner', 'OB/Gyn, General', 'Physician Assistant', 'Preventive Medicine', 'Women and Children\'s Health', 'Women\'s Health Care Nurse Practitioner' ]);
    });

    it('should check that all filter options are present', function() {
        browser.get(fadpage);

        element(by.model('primarySwitch')).click();
        element(by.cssContainingText('option', 'Primary Care Provider')).click();
        element(by.model('primaryCare')).click();
        element(by.cssContainingText('option', 'Family Medicine')).click()
        expect(element(by.model('location')).isPresent()).toBe(true)
        expect(element(by.model('gender.male')).isPresent()).toBe(true)
        expect(element(by.model('gender.female')).isPresent()).toBe(true)
        expect(element(by.model('language')).isPresent()).toBe(true)
    }); //Done

    // it('should check that there are 10 options in the language dropdown', function() {

    // });

    // it('should check that search filters bring up doctors that reflect the parameters', function() {

    // });

    it('should check that the learn about our survery button goes to the correct page', function() {
        element(by.css('[href="pressganey.php"]')).click();
        browser.wait(EC.urlIs('https://healthcare.utah.edu/fad/pressganey.php'), 5000);
    }); //Done

    it('should check that view all doctors goes to the correct page', function() {
        browser.get(fadpage);

        element(by.css('[href="all.php"]')).click();
        browser.wait(EC.urlIs('https://healthcare.utah.edu/fad/all.php'), 5000);
    }); //Done

    it('should check that all links in the footer are there', function() {
        filterEl('.o-footer__link')
        expect(el.getText()).toEqual(['About Us', 'Academics & Research', 'Billing', 'Jobs', 'Giving', 'Maps & Directions', 'Newsroom', 'The Imagine Perfect Care Program', 'Referring Providers', 'Find an Interpreter', 'Patient Rights & Responsibilities', 'Disclaimer', 'Privacy Statement', 'DNV GL Public Information Policy Statement', 'Non-Discrimination Policy', 'Webmaster'])
    }); //Done
});