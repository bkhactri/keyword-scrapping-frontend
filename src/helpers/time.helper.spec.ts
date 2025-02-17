import { timeDiffInSecondsAndMinutes } from "@helpers/time.helper";

describe("Time helper", () => {
  describe("timeDiffInSecondsAndMinutes", () => {
    describe("give invalid input", () => {
      it('should return "Invalid"', () => {
        const startTime = null;
        const endTime = "2023-12-19T10:00:00";

        const result = timeDiffInSecondsAndMinutes(startTime, endTime);

        expect(result).toBe("Invalid");
      });

      it('should return "Invalid" when both inputs are null', () => {
        const startTime = null;
        const endTime = null;

        const result = timeDiffInSecondsAndMinutes(startTime, endTime);

        expect(result).toBe("Invalid");
      });
    });

    describe("give valid inputs with minutes difference", () => {
      it("should return the correct time difference in minutes", () => {
        const startTime = "2023-12-19T10:00:00";
        const endTime = "2023-12-19T10:01:00";

        const result = timeDiffInSecondsAndMinutes(startTime, endTime);

        expect(result).toBe("1 minute");
      });

      it("should return the correct time difference in minutes (plural)", () => {
        const startTime = "2023-12-19T10:00:00";
        const endTime = "2023-12-19T10:05:00";

        const result = timeDiffInSecondsAndMinutes(startTime, endTime);

        expect(result).toBe("5 minutes");
      });
    });

    describe("give valid inputs with seconds difference", () => {
      it("should return the correct time difference in seconds", () => {
        const startTime = "2023-12-19T10:00:00";
        const endTime = "2023-12-19T10:00:10";

        const result = timeDiffInSecondsAndMinutes(startTime, endTime);

        expect(result).toBe("10 seconds");
      });

      it("should return the correct time difference in seconds (plural)", () => {
        const startTime = "2023-12-19T10:00:00";
        const endTime = "2023-12-19T10:00:30";

        const result = timeDiffInSecondsAndMinutes(startTime, endTime);

        expect(result).toBe("30 seconds");
      });
    });

    describe("give valid inputs with minutes and seconds difference", () => {
      it("should return the correct time difference in minutes and seconds", () => {
        const startTime = "2023-12-19T10:00:00";
        const endTime = "2023-12-19T10:01:30";

        const result = timeDiffInSecondsAndMinutes(startTime, endTime);

        expect(result).toBe("1 minute 30 seconds");
      });

      it("should return the correct time difference in minutes and seconds (plural)", () => {
        const startTime = "2023-12-19T10:00:00";
        const endTime = "2023-12-19T10:05:15";

        const result = timeDiffInSecondsAndMinutes(startTime, endTime);

        expect(result).toBe("5 minutes 15 seconds");
      });
    });

    describe("give valid inputs with negative time difference", () => {
      it("should return the correct time difference in minutes", () => {
        const startTime = "2023-12-19T10:01:00";
        const endTime = "2023-12-19T10:00:00";

        const result = timeDiffInSecondsAndMinutes(startTime, endTime);

        expect(result).toBe("1 minute");
      });
    });
  });
});
