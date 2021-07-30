use company;

CREATE VIEW vwDepartment as
select departmentNo, CONCAT(departmentName, ' ',departmentLocation) as department
from department;