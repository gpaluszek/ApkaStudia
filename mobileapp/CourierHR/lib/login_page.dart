import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Container(
        color: Colors.red,
        child: Transform.rotate(
          angle: -0.1, // kąt przekręcenia w radianach
          child: Align(
            alignment: Alignment.center,
            child: Container(
              height: MediaQuery.of(context).size.height * 0.9, 
              width: MediaQuery.of(context).size.width,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(60),
              ),
              child: Transform.rotate(
                angle: 0.1, // kąt przekręcenia w radianach
                child: SizedBox(
                    width: MediaQuery.of(context).size.width * 0.1,
                     child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Image.asset(
                            'assets/logo.png',
                            width: 175,
                            height: 40,             
                          ),
                          SizedBox(height: 110), 
                          Container(
                            width: MediaQuery.of(context).size.width * 0.7,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Witaj!',
                                  textAlign: TextAlign.left,
                                  style: GoogleFonts.poppins(
                                    textStyle: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.w400,
                                      color: Colors.black,
                                    ),
                                  ),
                                ),
                                Text(
                                  'Zaloguj się, aby kontynuować',
                                  style: GoogleFonts.poppins(
                                    textStyle: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w400,
                                      color: Colors.black,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),     
                          SizedBox(height: 20),
                          Container(
                            width: MediaQuery.of(context).size.width * 0.7,
                            child: Form(
                              child: TextFormField(
                                style: GoogleFonts.poppins(
                                  fontSize: 11,
                                  color: Colors.black,
                                ),
                                decoration: InputDecoration(
                                  hintText: 'Email Adress',
                                  hintStyle: TextStyle(color: Color(0xFF5A5A5A)),
                                  filled: true,
                                  fillColor: Color(0xFFF5F5F5),
                                  labelText: "Email",
                                  floatingLabelBehavior: FloatingLabelBehavior.always,
                                  prefixIcon: Icon(FontAwesomeIcons.envelope),
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(6),
                                    borderSide: BorderSide(color:  Color(0xFF5A5A5A),
                                    ),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(10),
                                    borderSide: BorderSide(color: Colors.green),
                                    
                                  ),
                                  
                                ),
                              ),
                            ),
                          ),
                          SizedBox(height: 20),
                          Container(
                            width: MediaQuery.of(context).size.width * 0.7,
                            child: TextField(
                              style: GoogleFonts.poppins(
                                fontSize: 18,
                                color: Colors.black,
                              ),
                              obscureText: true,
                              decoration: InputDecoration(
                                hintText: 'Hasło',
                              ),
                            ),
                          ),
                          SizedBox(height: 20),
                          ElevatedButton(
                            onPressed: () {},
                            child: Text(
                              'Zaloguj się',
                              style: GoogleFonts.poppins(
                                fontSize: 18,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ],
                      ),
                  
                  
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
