<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\\PHPMailer\\PHPMailer;
use PHPMailer\\PHPMailer\\SMTP;
use PHPMailer\\PHPMailer\\Exception;

// Load PHPMailer files
require \'PHPMailer_lib/src/Exception.php\';
require \'PHPMailer_lib/src/PHPMailer.php\';
require \'PHPMailer_lib/src/SMTP.php\';

header("Access-Control-Allow-Origin: *"); // For development. Restrict in production to your actual domain.
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER[\'REQUEST_METHOD\'] === \'POST\') {
    $data = json_decode(file_get_contents("php://input"));

    if (
        !empty($data->name) &&
        !empty($data->email) &&
        !empty($data->message) &&
        filter_var($data->email, FILTER_VALIDATE_EMAIL)
    ) {
        $mail = new PHPMailer(true); // Passing `true` enables exceptions

        try {
            //Server settings
            // $mail->SMTPDebug = SMTP::DEBUG_SERVER; // Enable verbose debug output for troubleshooting
            $mail->isSMTP();                                      // Send using SMTP
            $mail->Host       = \'smtp.gmail.com\';                 // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                             // Enable SMTP authentication
            $mail->Username   = \'russelldelasantos@gmail.com\'; // SMTP username (your Gmail address)
            $mail->Password   = \'zwqk ispr cmpd iigf\';      // SMTP password (the App Password you generated)
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;      // Enable implicit SMTPS encryption
            $mail->Port       = 465;                              // TCP port to connect to; use 465 for `PHPMailer::ENCRYPTION_SMTPS` or 587 for `PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom(\'russelldelasantos@gmail.com\', htmlspecialchars($data->name)); // Sender\'s email and name
            $mail->addAddress(\'jamesdelosrosa@gmail.com\', \'James Dela Rosa\');     // Add a recipient (your personal email for testing)
            $mail->addReplyTo(htmlspecialchars($data->email), htmlspecialchars($data->name)); // So replies go to the form submitter

            // Content
            $mail->isHTML(false); // Set email format to plain text
            $mail->Subject = \'New Contact Form Submission from \' . htmlspecialchars($data->name);
            
            $email_body = "You have received a new message from your website contact form.\\n\\n";
            $email_body .= "Name: " . htmlspecialchars($data->name) . "\\n";
            $email_body .= "Email: " . htmlspecialchars($data->email) . "\\n";
            $email_body .= "Message:\\n" . htmlspecialchars($data->message) . "\\n";
            $mail->Body    = $email_body;

            $mail->send();
            http_response_code(200);
            echo json_encode(array("success" => true, "message" => "Message sent successfully."));

        } catch (Exception $e) {
            http_response_code(500);
            error_log("PHPMailer Error: {$mail->ErrorInfo}"); // Log the detailed PHPMailer error
            echo json_encode(array("success" => false, "message" => "Failed to send email. Mailer Error: {$mail->ErrorInfo}"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Invalid input. Please check your data."));
    }
} else {
    http_response_code(405); 
    echo json_encode(array("success" => false, "message" => "Method not allowed."));
}
?>