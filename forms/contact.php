<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);
if($_POST){
    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_OFF;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'austinm.info';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'mailer@austinm.info';                     //SMTP username
        $mail->Password   = 'Spotbone2035501!';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 465;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        $mail->setFrom('mailer@austinm.info', 'Portfolio Mailer');
        $mail->addAddress('austin.meier@hotmail.com');
        $mail->addAddress('austin@amsolutionssc.com');    //Add a recipient



        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'New Portfolio website contact form message';
        $mail->Body    = "Name: ".$_POST['name']."<br> Address: ".$_POST['email']."<br> Subject: ".$_POST['subject']."<br> Message: ".$_POST['message'];

        $mail->send();
        echo 'Thank you, your message has been sent successfully.';
    } catch (Exception $e) {
        echo "Sorry, your message could not be sent. Please try again, or contact me at my email austin@amsolutionssc.com Mailer Error: {$mail->ErrorInfo}";
    }
} else { echo 'NO POST'; }
?>
