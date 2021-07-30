use company;

DELIMITER //
CREATE PROCEDURE company.salaryChange (IN employeeId int, IN incDecPerc int)

BEGIN

    
	update employee
	set salary = salary + (salary * incDecPerc / 100.0)
	where employeeNo = employeeId;
    
    select *
    from employee;
    
END //
DELIMITER ;

CALL salaryChange(1, 10);

select * from employee;

drop procedure salaryChange;
