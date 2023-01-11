import React from 'react'
import AtomicSpinner from './AtomicSpinner'

describe('<AtomicSpinner />', () => {
  describe('Electrons', () => {
    const getElectrons = () => cy.get('[data-testid="electron"] circle');

    it('should render the correct number of electrons', () => {
      cy.mount(<AtomicSpinner
        electronPathCount={3}
        electronsPerPath={4} />
      );

      const electrons = getElectrons();

      electrons.should(($electrons) => {
        expect($electrons).to.have.length(12);
      });
    });

    it('should render the correct colors for electrons', () => {
      const colorPalette = ['#123456', '#987654', '#024680'];

      cy.mount(<AtomicSpinner
        electronColorPalette={colorPalette} />
      );

      const electrons = getElectrons();

      electrons.should(($electrons) => {
        const distinctColors = new Set($electrons.map((_, $electron) => $electron.getAttribute('fill')));
        colorPalette.forEach(color => {
          expect(distinctColors).to.contain(color);
        });
        $electrons.each((_, $electron) => {
          expect($electron.getAttribute('fill')).to.be.oneOf(colorPalette);
        });
      });
    });
  });
});
