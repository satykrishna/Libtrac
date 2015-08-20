Library Capacity Tracker
=========================

In this Project, a team of seven people formalized an Android application to provide available seating space in libraries and friend finding facility by designing an algorithm to process data gathered through routers and IR sensors.

Modules 
-------

The four main modules of the project are: <br>
1. Android Application <br> 2. Server <br> 3. Sensors <br> 4. Router

Technology Details
-------------------

<b>Server Side:</b> Technology NODE JS Framework EXPRESS JS Programming language JavaScript and python Data exchange format JSON by REST APIs Encryption used Advanced Encryption Standard (AES) Operating system Linux Ubuntu Programming IDE Sublime text

<b>Database:</b> Technology MONGO DB – NoSQL Version : 2.6.5

<b>CLOUD SERVICE MongoDB-as-service Host : </b>Mongo Labs Plan: Sandbox

<b>CLIENT SIDE (APP)</b>

Technology Android Version V 4.0.3+ IDE Android Studio

<b>HARDWARE SIDE</b>: Sensors IR-LED, VS1838B TSOP Micro controllers Arduino Fio, XBEE-WiFi

<b>Description Sensor platform: </b>Hardware components used: Arduino Fio, Xbee, IR LED’s and receivers. Based on the order in which they are triggered it is determined if the person is entering or leaving and accordingly the count is incremented/decremented.The count is sent every 5 minutes.

<b>Router:</b> <br>
Assumption: A person in the library has at least one device connected to the internet. Router contains MAC address/IP address of users.Server connects to the router to obtain information.

<b>Server: </b>Server interacts with client (app), router and the sensor. Server code runs on NODE.js using express.js Server has dedicated methods which accepts the requests and data in the JSON format. Server is connected to MongoDB which is present in the cloud hosted by Mongo Labs.MongoDB is purely NoSQL DB.

Video Link
-----------

Please find below video to watch demo of this project
https://www.youtube.com/watch?v=hlMtsJnDzVA&feature=youtu.be

