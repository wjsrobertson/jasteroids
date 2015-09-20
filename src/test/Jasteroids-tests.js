describe("Jasteroids", function() {
   it("can check if two floating point numbers are close together", function() {
       var close = Jasteroids.eq(1, 1.00000001);

       expect(close).toBe(true);
   });
});