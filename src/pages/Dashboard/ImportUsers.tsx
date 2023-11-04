import React, { useState, ChangeEvent } from 'react';
import ExcelJS, { Row } from 'exceljs';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  cellphone: number;
  address: string;
  password: string;
  status: number;
  roleId: number;
}

const ImportUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const readExcel = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);
      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) return;
      const users: User[] = [];
      worksheet.eachRow((row: Row, rowNumber: number) => {
        if (rowNumber === 1) return; // Skip header row
        const user: User = {
          firstname: row.getCell(1).text,
          lastname: row.getCell(2).text,
          email: row.getCell(3).text,
          cellphone: +row.getCell(4).text,
          address: row.getCell(5).text,
          password: row.getCell(6).text,
          status: +row.getCell(7).text,
          roleId: +row.getCell(8).text,
        };
        users.push(user);
      });
      setUsers(users);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files![0];
          readExcel(file);
        }}
      />

      {users.map((user, i) => (
        <div key={i}>
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
          <p>{user.email}</p>
          <p>{user.cellphone}</p>
          <p>{user.address}</p>
          <p>{user.password}</p>
          <p>{user.status}</p>
          <p>{user.roleId}</p>
        </div>
      ))}
    </div>
  );
}

export default ImportUsers;