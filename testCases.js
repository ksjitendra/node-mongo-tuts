const assert = require('assert');
const Booking = require('./path/to/booking/model');

describe('Booking', () => {
  describe('#createBooking()', () => {
    it('should create a new booking', async () => {
      const bookingData = {
        customerName: 'John Doe',
        pickupLocation: 'ABC Street',
        dropoffLocation: 'XYZ Street'
      };

      const booking = await Booking.create(bookingData);

      assert.strictEqual(booking.customerName, bookingData.customerName);
      assert.strictEqual(booking.pickupLocation, bookingData.pickupLocation);
      assert.strictEqual(booking.dropoffLocation, bookingData.dropoffLocation);
    });

    it('should require customer name', async () => {
      const bookingData = {
        pickupLocation: 'ABC Street',
        dropoffLocation: 'XYZ Street'
      };

      try {
        await Booking.create(bookingData);
        assert.fail('Should have thrown an error');
      } catch (error) {
        assert.strictEqual(error.name, 'ValidationError');
        assert.ok(error.errors.customerName);
      }
    });
  });
});
