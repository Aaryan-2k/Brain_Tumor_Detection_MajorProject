from datetime import datetime
from flask import Flask,render_template,json,request,redirect,make_response,jsonify,session
from pymongo import MongoClient


app = Flask(__name__,  static_url_path='/static')
client = MongoClient('mongodb+srv://aaryantyagi17:vAqL9FKNF7ft52uz@test1.e6kgoi4.mongodb.net/') 
db = client['brain-tumor-project']  
users= db['patient-db']
reports=db["reports-db"]


app=Flask(__name__)
app.secret_key="6A18459CE84EDD817F1D45C49191E"


@app.route('/login', methods=['GET','POST'])
@app.route('/', methods=['GET','POST'])
def home_page():
    if request.method=="GET":
        if "user" in session:
            return redirect("/brain")
        return render_template("login.html")
    email=request.form["email"]
    password=request.form["password"]
    existing_email=users.find_one({'email': email})
    if existing_email:
        if password==existing_email["password"]:
            user=email
            session['user']=user
            return redirect("/brain")
    return "wrong credentials"


@app.route('/register', methods=['GET','POST'])
def register():
    if request.method=="GET":
        return render_template("register.html")
    email = request.form['email']
    first_name = request.form['first-name']
    last_name=request.form['last-name']
    phone=request.form['phone']
    password=request.form["password"]
    new_user = {
        'first-name': first_name,
        'last-name': last_name,
        'email':email,
        'password': password,
        'phone':phone,
        'img':"/static/img/def.jpg"
    }
    print(new_user)
    users.insert_one(new_user)
    return redirect('/login')


@app.route("/reports")
def get_reports():
    if "user" in session:
        return render_template("reports.html")
    else:
        return "You dont have authorization"


@app.route("/brain")
def mri_scan():
    if "user" in session:
        return render_template("index.html")
    return "session expired! Login again"


@app.route("/api-email",methods=['POST'])
def check_email():
    req = request.get_json()
    email=req["email"]
    email_exists=users.find_one({"email":email})
    print(email)
    resp={"success":False}
    if email_exists:
        return make_response(jsonify(resp))
    resp["success"]=True
    return make_response(jsonify(resp))


@app.route("/api-login",methods=["POST"])
def check_creds():
    req=request.get_json()
    email=req["email"]
    password=req['password']
    existing_email=users.find_one({'email': email})
    if existing_email:
        if password==existing_email["password"]:
            return make_response(jsonify({"success":True}))       
    return make_response(jsonify({"success":False}))

@app.route("/profile")
def pro():
    return render_template("profile.html")


@app.route("/logout")
def logout():
    session.pop("user",None)
    return redirect("/login")


@app.route("/api-reports")
def set_reports():
    try:
        data = list(reports.find({"email": session["user"]}, {"_id": 0}))
        """data = list(reports.find(({"email":session["user"]},{"_id": 0})))"""
        print(data)
        data=data[::-1]
        return jsonify(data), 200
    except Exception as e:
        print('Error fetching reports:', e)
        return jsonify({'error': 'Internal Server Error'}), 500
    

@app.route("/api-setreports",methods=["POST"])
def set_reportss():
    req=request.get_json()
    data=req['result']
    data={"email":session["user"],"result":data,"date":datetime.now()}
    print(data)
    reports.insert_one(data)
    return make_response(jsonify({"success":True}))
@app.route("/load-api")
def load_img():
    try:
        data = users.find_one({"email": session["user"]})
        if "img" not in data:
            return jsonify({"pa":"/static/img/def.jpg"}), 200
        else:
            return jsonify({"pa":data["img"]})
    except Exception as e:
        print('Error fetching reports:', e)
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route("/user-profile")
def load_user_data():
    data=users.find_one({"email":session["user"]})
    return jsonify({"gmail":data["email"],"fname":data["first-name"],"lname":data["last-name"],"tel":data["phone"]})
    
if __name__=="__main__":
    app.run(debug=True)