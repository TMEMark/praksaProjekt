use company;

SELECT AVG(salary) AS "Average Salary"
FROM employee
WHERE departmentNo in (2,3);
    

SELECT a.departmentLocation, COUNT(b.employeename) AS "broj zaposlenih"
FROM department a
inner join employee b on a.departmentNo=b.departmentNo
GROUP BY a.departmentLocation
HAVING COUNT(b.departmentNo) > 1 ;

SELECT COUNT(b.employeename)
FROM department a
inner join employee b on a.departmentNo=b.departmentNo
where a.departmentName = "Development"
GROUP BY a.departmentName;



select * from(
	select employeename, salary, dense_rank() 
	over(order by salary desc)r from employee
) AS a
where r= 2;



  
  
