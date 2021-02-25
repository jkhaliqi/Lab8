describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });
  
  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider').then(($el) => {
      expect($el).to.have.value(75);
    })
  })

  it('Volume input changes when sider changes', () => {
    cy.get('#volume-slider').invoke('val',33).trigger('input');
    cy.get('#volume-number').then(($el) => {
      expect($el).to.have.value(33);
    })
  })

  it('Volume of audio element changes', () => {
    cy.get('#volume-slider').invoke('val',33).trigger('input');
    cy.get('#horn-sound').then(($el) => {
      expect($el).to.have.prop('volume',.33);
    })
  })

  it('Image and sound source change when party horn selected', () => {
    cy.get('#radio-party-horn').click();
    cy.get('#sound-image').then($el => {
      expect($el).to.have.attr('src','./assets/media/images/party-horn.svg')
    })
    cy.get('#horn-sound').then($el => {
      expect($el).to.have.attr('src','./assets/media/audio/party-horn.mp3')
    })
  })

  it('Volume image changes from mute to one bar when volume level goes from 0 to 1', () => {
    cy.get('#volume-slider').invoke('val',0).trigger('input');
    cy.get('#volume-image').then($el => {
      expect($el).to.have.attr('src','./assets/media/icons/volume-level-0.svg')
    })
    cy.get('#volume-slider').invoke('val',1).trigger('input');
    cy.get('#volume-image').then($el => {
      expect($el).to.have.attr('src','./assets/media/icons/volume-level-1.svg')
    })
  })

  it('Volume image changes from one bar to two bar when volume level goes from 33 to 34', () => {
    cy.get('#volume-slider').invoke('val',33).trigger('input');
    cy.get('#volume-image').then($el => {
      expect($el).to.have.attr('src','./assets/media/icons/volume-level-1.svg')
    })
    cy.get('#volume-slider').invoke('val',34).trigger('input');
    cy.get('#volume-image').then($el => {
      expect($el).to.have.attr('src','./assets/media/icons/volume-level-2.svg')
    })
  })

  it('Volume image changes from two bar to the max three bars when volume level goes from 66 to 67', () => {
    cy.get('#volume-slider').invoke('val',66).trigger('input');
    cy.get('#volume-image').then($el => {
      expect($el).to.have.attr('src','./assets/media/icons/volume-level-2.svg')
    })
    cy.get('#volume-slider').invoke('val',67).trigger('input');
    cy.get('#volume-image').then($el => {
      expect($el).to.have.attr('src','./assets/media/icons/volume-level-3.svg')
    })
  })

  it('Honk button is disabled when the textbox is empty', () => {
    cy.get('#volume-number').clear()
    cy.get('#honk-btn').then($el => {
      expect($el).to.have.prop('disabled',true);
    })
  })

  it('Honk button is disabled when the textbox is a non-number', () => {
    cy.get('#volume-number').clear().type('e');
    cy.get('#honk-btn').then($el => {
      expect($el).to.have.prop('disabled',true);
    })
  })

 it('Check if an error is shown when a number is typed outside of the given range for the volume textbox input',() => {
    cy.get('#party-horn-form').within( () => {
      cy.get('#volume-number').clear().type('-10');
      cy.get('#volume-number').invoke('prop','validationMessage')
      .should('equal','Value must be greater than or equal to 0.');
      cy.get('#volume-number').clear().type('999');
      cy.get('#volume-number').invoke('prop','validationMessage')
      .should('equal','Value must be less than or equal to 100.')
    })
  })
  
});
