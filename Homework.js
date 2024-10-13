//  function calculateTotalTarget(startDate,endDate,totalAnnualTarget){
//      let totalTarget = 0;
//      let currentDate = new Date(startDate);
//      let endDateDate = new Date(endDate);
//      while(currentDate <= endDateDate){
//          totalTarget += totalAnnualTarget;
//          currentDate.setFullYear(currentDate.getFullYear() + 1);
//      }
//      return totalTarget;
// }
// console.log(calculateTotalTarget("2021-01-01","2022-12-31",10000));

function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    
    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function isFriday(date) {
        return date.getDay() === 5; // 5 corresponds to Friday
    }

    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    let totalValidDays = 0;


    let currentDate = new Date(start);
    while (currentDate <= end) {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        
        const daysInMonth = getDaysInMonth(year, month);
        
        let validDaysCount = 0;
        let workedDaysCount = 0;

        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month, daysInMonth);

        const effectiveStartDate = (startOfMonth < start) ? start : startOfMonth;
        const effectiveEndDate = (endOfMonth > end) ? end : endOfMonth;

        for (let day = effectiveStartDate.getDate(); day <= effectiveEndDate.getDate(); day++) {
            const dateToCheck = new Date(year, month, day);
            if (!isFriday(dateToCheck)) {
                validDaysCount++;
                if (dateToCheck >= start && dateToCheck <= end) {
                    workedDaysCount++;
                }
            }
        }

        daysExcludingFridays.push(validDaysCount);
        daysWorkedExcludingFridays.push(workedDaysCount);
        
        totalValidDays += workedDaysCount;

        currentDate.setMonth(month + 1);
    }

    const monthlyTargets = daysExcludingFridays.map(days => 
      (days / totalValidDays) * totalAnnualTarget);

    // Calculate total target based on worked days within the range
    const totalTarget = monthlyTargets.reduce((sum, target) => sum + target, 0);

    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget
    };
}

console.log(calculateTotalTarget('2024-01-01', '2024-03-31', 5220));