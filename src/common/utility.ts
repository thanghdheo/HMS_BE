import { BadRequestException } from '@nestjs/common';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp';
import * as _ from 'lodash';

export class Utility {
  async exportData(data: any[]): Promise<any> {
    let rows = [];
    data.forEach((doc) => {
      rows.push(Object.values(doc));
    });

    let book = new Workbook();
    let sheet = book.addWorksheet(`data`);
    let stt = 1;
    sheet.columns = [
      { header: 'STT', key: 'stt', width: 5 },
      { header: 'Code', key: 'code', width: 20 },
      { header: 'Name', key: 'name', width: 40 },
      { header: 'Description', key: 'description', width: 40 },
      { header: 'Created', key: 'create_date', width: 32 },
      { header: 'Created By', key: 'create_by', width: 20 },
      { header: 'Updated', key: 'update_date', width: 32 },
      { header: 'Updated By', key: 'update_by', width: 20 },
      { header: 'Active', key: 'active', width: 10 },
    ];
    data.map((m) => {
      sheet.addRow({
        stt: stt,
        name: m.name,
        code: m.code,
        description: m.description,
        create_date: m.create_date
          ? new Date(m.create_date)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          : null,
        create_by: m.create
          ? m.create.first_name + ' ' + m.create.last_name
          : null,
        update_date: m.update_date
          ? new Date(m.update_date)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          : null,
        update_by: m.update
          ? m.update.first_name + ' ' + m.update.last_name
          : null,
        active: m.active,
      });
      stt++;
    });

    return await this.createFileExcel(book);
  }

  async createFileExcel(book: Workbook): Promise<any> {
    let file = await new Promise((resolve, reject) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: 'MyExcelSheet',
          postFix: '.xlsx',
          mode: parseInt('0600', 8),
        },
        async (err, file) => {
          if (err) {
            throw new BadRequestException(err);
          }
          book.xlsx
            .writeFile(file)
            .then((_) => {
              resolve(file);
            })
            .catch((err) => {
              throw new BadRequestException(err);
            });
        },
      );
    });

    return file;
  }

  async exportDataStep(data: any[]): Promise<any> {
    let rows = [];
    data.forEach((doc) => {
      rows.push(Object.values(doc));
    });

    let book = new Workbook();
    let sheet = book.addWorksheet(`data`);
    let stt = 1;
    sheet.columns = [
      { header: 'STT', key: 'stt', width: 5 },
      { header: 'Step Code', key: 'code', width: 20 },
      { header: 'Step Name', key: 'name', width: 40 },
      { header: 'Workflow', key: 'Workflow', width: 40 },
      { header: 'Description', key: 'description', width: 40 },
      { header: 'Created', key: 'create_date', width: 32 },
      { header: 'Created By', key: 'create_by', width: 20 },
      { header: 'Updated', key: 'update_date', width: 32 },
      { header: 'Updated By', key: 'update_by', width: 20 },
      { header: 'Active', key: 'active', width: 10 },
    ];
    data.map((m) => {
      sheet.addRow({
        stt: stt,
        name: m.name,
        code: m.code,
        Workflow: m.workflow ? m.workflow.name : null,
        description: m.description,
        create_date: m.create_date
          ? new Date(m.create_date)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          : null,
        create_by: m.create
          ? m.create.first_name + ' ' + m.create.last_name
          : null,
        update_date: m.update_date
          ? new Date(m.update_date)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          : null,
        update_by: m.update
          ? m.update.first_name + ' ' + m.update.last_name
          : null,
        active: m.active,
      });
      stt++;
    });

    return await this.createFileExcel(book);
  }

  async exportDataWorkflow(data: any[]): Promise<any> {
    let rows = [];
    data.forEach((doc) => {
      rows.push(Object.values(doc));
    });

    let book = new Workbook();
    let sheet = book.addWorksheet(`data`);
    let stt = 1;
    sheet.columns = [
      { header: 'STT', key: 'stt', width: 5 },
      { header: 'Code', key: 'code', width: 20 },
      { header: 'Name', key: 'name', width: 40 },
      { header: 'Type', key: 'type', width: 40 },
      { header: 'Description', key: 'description', width: 40 },
      { header: 'Created', key: 'create_date', width: 32 },
      { header: 'Created By', key: 'create_by', width: 20 },
      { header: 'Updated', key: 'update_date', width: 32 },
      { header: 'Updated By', key: 'update_by', width: 20 },
      { header: 'Active', key: 'active', width: 10 },
    ];
    data.map((m) => {
      sheet.addRow({
        stt: stt,
        name: m.name,
        code: m.code,
        type: m.type ? m.type.name : null,
        description: m.description,
        create_date: m.create_date
          ? new Date(m.create_date)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          : null,
        create_by: m.create
          ? m.create.first_name + ' ' + m.create.last_name
          : null,
        update_date: m.update_date
          ? new Date(m.update_date)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          : null,
        update_by: m.update
          ? m.update.first_name + ' ' + m.update.last_name
          : null,
        active: m.active,
      });
      stt++;
    });

    return await this.createFileExcel(book);
  }

  async exportDataProductType(data: any[]): Promise<any> {
    let rows = [];
    data.forEach((doc) => {
      rows.push(Object.values(doc));
    });

    let book = new Workbook();
    let sheet = book.addWorksheet(`data`);
    let stt = 1;
    sheet.columns = [
      { header: 'STT', key: 'stt', width: 5 },
      { header: 'Code', key: 'code', width: 20 },
      { header: 'Name', key: 'name', width: 40 },
      { header: 'Product Type', key: 'product_type', width: 40 },
      { header: 'Description', key: 'description', width: 40 },
      { header: 'Created', key: 'create_date', width: 32 },
      { header: 'Created By', key: 'create_by', width: 20 },
      { header: 'Updated', key: 'update_date', width: 32 },
      { header: 'Updated By', key: 'update_by', width: 20 },
      { header: 'Active', key: 'active', width: 10 },
    ];
    data.map((m) => {
      sheet.addRow({
        stt: stt,
        name: m.name,
        code: m.code,
        product_type: m.product_type ? m.product_type.name : null,
        description: m.description,
        create_date: m.create_date
          ? new Date(m.create_date)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          : null,
        create_by: m.create
          ? m.create.first_name + ' ' + m.create.last_name
          : null,
        update_date: m.update_date
          ? new Date(m.update_date)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          : null,
        update_by: m.update
          ? m.update.first_name + ' ' + m.update.last_name
          : null,
        active: m.active,
      });
      stt++;
    });

    return await this.createFileExcel(book);
  }

  async exportDataAccount(data: any[]): Promise<any> {
    let rows = [];
    data.forEach((doc) => {
      rows.push(Object.values(doc));
    });

    let book = new Workbook();
    let sheet = book.addWorksheet(`data`);
    let stt = 1;
    sheet.columns = [
      { header: 'STT', key: 'stt', width: 5 },
      { header: 'Code', key: 'code', width: 20 },
      { header: 'Name', key: 'name', width: 40 },
      { header: 'Email', key: 'email', width: 40 },
      { header: 'Phone', key: 'phone', width: 40 },
      { header: 'Description', key: 'description', width: 40 },
      { header: 'Created', key: 'create_date', width: 32 },
      { header: 'Created By', key: 'create_by', width: 20 },
      { header: 'Updated', key: 'update_date', width: 32 },
      { header: 'Updated By', key: 'update_by', width: 20 },
      { header: 'Active', key: 'active', width: 10 },
    ];
    data.map((m) => {
      sheet.addRow({
        stt: stt,
        name: m.name,
        code: m.code,
        email: m.email,
        phone: m.phone,
        description: m.description,
        create_date: m.create_date
          ? new Date(m.create_date)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          : null,
        create_by: m.create
          ? m.create.first_name + ' ' + m.create.last_name
          : null,
        update_date: m.update_date
          ? new Date(m.update_date)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          : null,
        update_by: m.update
          ? m.update.first_name + ' ' + m.update.last_name
          : null,
        active: m.active,
      });
      stt++;
    });

    return await this.createFileExcel(book);
  }

  async exportDataUser(data: any[]): Promise<any> {
    let rows = [];
    data.forEach((doc) => {
      rows.push(Object.values(doc));
    });

    let book = new Workbook();
    let sheet = book.addWorksheet(`data`);
    let stt = 1;
    sheet.columns = [
      { header: 'STT', key: 'stt', width: 5 },
      { header: 'User Name', key: 'UserName', width: 20 },
      { header: 'Full Name', key: 'full_name', width: 40 },
      { header: 'Email', key: 'email', width: 40 },
      { header: 'Phone', key: 'phone', width: 40 },
      { header: 'Address', key: 'address', width: 40 },
      { header: 'Company', key: 'company', width: 40 },
      { header: 'Department', key: 'department', width: 40 },
      { header: 'Job Title', key: 'job_title', width: 40 },
      { header: 'User Group', key: 'user_group', width: 40 },
      { header: 'Created', key: 'create_date', width: 32 },
      { header: 'Created By', key: 'create_by', width: 20 },
      { header: 'Updated', key: 'update_date', width: 32 },
      { header: 'Updated By', key: 'update_by', width: 20 },
      { header: 'Active', key: 'active', width: 10 },
    ];
    data.map((m) => {
      sheet.addRow({
        stt: stt,
        UserName: m.UserName,
        full_name: m.first_name + ' ' + m.last_name,
        email: m.email,
        phone: m.phone,
        address: m.address,
        company: m.company ? m.company.name : null,
        department: m.department ? m.department.name : null,
        job_title: m.job_title ? m.job_title.name : null,
        user_group: m.user_group ? m.user_group.name : null,
        create_date: m.create_date
          ? new Date(m.create_date)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          : null,
        create_by: m.create
          ? m.create.first_name + ' ' + m.create.last_name
          : null,
        update_date: m.update_date
          ? new Date(m.update_date)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          : null,
        update_by: m.update
          ? m.update.first_name + ' ' + m.update.last_name
          : null,
        active: m.active,
      });
      stt++;
    });

    return await this.createFileExcel(book);
  }
}
