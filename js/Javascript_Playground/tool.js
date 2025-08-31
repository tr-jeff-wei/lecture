class Tool {

       static ran(start, end) {
              var diff = end - start;
              return Math.floor(Math.random() * (diff + 1)) + start;
       }

       static ran_array(arr_in) {
              var result = [];
              while (arr_in.length > 0) {
                     let r = this.ran(0, arr_in.length - 1);
                     let a = arr_in.splice(r, 1);
                     result.push(a[0]);
              }
              return result;
       }
}
Tool.NAMES = [
       'Joe', 'Jack', 'Thomas', 'Ethan', 'Emily', 'Joanne', 'Lily', 'Linda'
];

Tool.NAMES_LEN =[
  'Joy','Ariel','Cristina' ,'Eric',
  'Harrington','Norman','Sanford','Thomasina',
  'Buckminster'
];
