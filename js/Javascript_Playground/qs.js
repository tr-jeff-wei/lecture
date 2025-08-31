class Question {
       constructor(check_img) {
              this.check_img = check_img;
              this.qitem = null;

              this.qs_index = 0;
              this.check_timer = 0;
              this.show_console = true;
              this.show_console_once = false;
       }

       show() {
              var startX = width / 10;
              var startY = width / 4;
              var shiftY;
              noStroke();
              fill(10, 10, 10, 230);
              rect(startX, startY, width * 8 / 10, height * 3 / 4);

              if (this.qitem == null) {
                     return;
              }
              if (this.qs_index < this.qitem.description.length) {

                     if (this.check_timer == 0) {
                            // text
                            var content = this.qitem.description[this.qs_index];
                            fill(255);
                            if (content.length <= 8) {
                                   shiftY = 45;
                                   textSize(22);
                            } else {
                                   shiftY = 30;
                                   textSize(18);
                            }
                            for (var t of content) {
                                   text(t, startX + 40, startY + 40);
                                   startY += shiftY;
                                   if (this.show_console && this.show_console_once == false) {
                                          console.log(t);
                                   }
                            }
                            this.show_console_once = true;
                     } else {
                            let img_i;
                            if (this.check_timer > 0) {
                                   img_i = 0;
                                   if (this.check_timer == 1) {
                                          this.next();
                                   }
                                   this.check_timer--;
                            } else {
                                   img_i = 1;
                                   this.check_timer++;
                            }
                            image(this.check_img[img_i], width / 2 - this.check_img[img_i].width / 2, height / 2);
                     }

              }
       }

       next() {
              this.qs_index++;
              this.show_console_once = false;
       }
       back() {
              this.qs_index--;
              this.show_console_once = false;
       }

       check_answer() {
              if (this.qitem == null || this.qs_index < this.qitem.answer_para.length) {
                     var para = this.qitem.answer_para[this.qs_index];
                     if (this.qitem.answer_fun[this.qs_index](para)) {
                            console.log('good!!');
                            this.check_timer = 200;
                     } else {
                            console.log('wrong');
                            this.check_timer = -200;
                     }
              }
       }

       set_question(idx) {
              switch (idx) {
                     case 0:
                            this.qitem = new QItem_var();
                            this.qs_index = 0;
                            break;
                     case 1:
                            this.qitem = new QItem_var_str();
                            this.qs_index = 0;
                            break;
                     case 2:
                            this.qitem = new QItem_if_sent();
                            this.qs_index = 0;
                            break;
                     case 3:
                            this.qitem = new QItem_if_sent_digit();
                            this.qs_index = 0;
                            break;
                     case 4:
                            this.qitem = new QItem_if();
                            this.qs_index = 0;
                            break;
                     case 5:
                            this.qitem = new QItem_for();
                            this.qs_index = 0;
                            break;
                     case 6:
                            this.qitem = new QItem_array();
                            this.qs_index = 0;
                            break;

                     case 7:
                            this.qitem = new QItem_array_1();
                            this.qs_index = 0;
                            break;
              }

       }


}
