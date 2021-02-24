const formatVolumeIconPath = require('../assets/scripts/main');

describe('volume icon', () => {
    test('first', () => {
	    expect(formatVolumeIconPath(1)).toBe('./assets/media/icons/volume-level-1.svg');	
	});

	test('second', () => {
	    expect(formatVolumeIconPath(34)).toBe('./assets/media/icons/volume-level-2.svg');
	});

	test('third',() => {
	    expect(formatVolumeIconPath(68)).toBe('./assets/media/icons/volume-level-3.svg');
	});

	test('zero volume',() => {
	    expect(formatVolumeIconPath(0)).toBe('./assets/media/icons/volume-level-0.svg');
	});
});
