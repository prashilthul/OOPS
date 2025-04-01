from flask import Flask , jsonify , request
import defined__classes as dc
app = Flask(__name__)


list_of_donors = [dc.Donor("Prash","prashil1411@gmail.com"),
                  dc.Donor("Athar","prashil1411@gmail.com"),
                  dc.Donor("Madhav","prashil1411@gmail.com"),
                  dc.Donor("Harsh","prashil1411@gmail.com"),
                  dc.Donor("akshat","prashil1411@gmail.com")]




donor_1 = dc.Donor("Prash","prashil1411@gmail.com")


@app.route('/api/get_info')
def get_user_info():
    user = request.args.get("name")
    donor = next((x for x in list_of_donors if x.name.lower() == user.lower()), None)
    # print(donor)
    if(donor):
        return jsonify({"Name":donor.name,"Email":donor.email})
    
    else:
        return jsonify({"Error":"user not found"})


@app.route('/api/add_new_user',methods=['POST'])
def add_new_user():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    print(name,email)
    if(name and  email):
        new_donor = dc.Donor(name=name,email=email)
        list_of_donors.append(new_donor)
        return jsonify({"message":"done"})
    else:
        print("Not enough Params")
        return jsonify({"message":"error"})


if __name__ == "__main__":
    app.run(debug=True)