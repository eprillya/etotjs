const LineAPI = require('./api');
const { Message, OpType, Location } = require('../curve-thrift/line_types');
let exec = require('child_process').exec;

//INI LineAlphat Lama//

//SCRIPT DABEST BUG BANLIST//

var myStaff = [];//Gosah Diisi Mid

const myAdmin = ['u08124dd7fc3ce40d4d7ffff9533653a9'];

const myAssist = [];//Kosongin Aja

const myBot = [];
var banList = [];//Banned list
var vx = {};var midnornama,pesane,kickhim;var waitMsg = "no";//DO NOT CHANGE THIS
var komenTL = "A̶n̶n̶a̶b̶e̶l̶l̶e̶ ̶αutσ líkє вσt вч\nhttp://line.me/ti/p/~eprillya"; //Comment for timeline
var bcText = "A̶n̶n̶a̶b̶e̶l̶l̶e̶ ";
var limitposts = '10'; //Output timeline post

function isAdmin(param) {
    return myAdmin.includes(param);
}

function isStaff(param) {
    return myStaff.includes(param);
}

function isBot(param) {
     return myBot.includes(param);
}

function isAssist(param) {
     return myAssist.includes(param);
}

function isBanned(param) {
    return banList.includes(param);
}

function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function isTGet(string,param){
	return string.includes(param);
}


class LINE extends LineAPI {
    constructor() {
        super();
        this.receiverID = '';
        this.checkReader = [];
        this.sendBlacklist = 0;
        this.stateStatus = {
            mute: 0,
            lockinvite: 0,
            lockupdategroup: 1,
            lockjoin: 0,
            lockcancel: 0,
            kick:1,
            cancel: 1,
            bmsg: 1,
        }
    }

    getOprationType(operations) {
        for (let key in OpType) {
            if(operations.type == OpType[key]) {
                if(key !== 'NOTIFIED_UPDATE_PROFILE') {
                    console.info(`[* ${operations.type} ] ${key} `);
                }
            }
        }
    }


    poll(operation) {
        if(operation.type == 25 || operation.type == 26) {
            const txt = (operation.message.text !== '' && operation.message.text != null ) ? operation.message.text : '' ;
            let message = new Message(operation.message);
            this.receiverID = message.to = (operation.message.to === myBot[0]) ? operation.message.from : operation.message.to ;
            Object.assign(message,{ ct: operation.createdTime.toString() });
            if(waitMsg == "yes" && operation.message.from == vx[0] && this.stateStatus.mute != 1){
				this.textMessage(txt,message,message.text)
			}else if(this.stateStatus.mute != 1){this.textMessage(txt,message);
			}else if(txt == "unmute" && isAdmin(operation.message.from) && this.stateStatus.mute == 1){
			    this.stateStatus.mute = 0;
			    this._sendMessage(message,"ヽ(^。^)ノ")
		    }else{console.info("Bot Off");}
        }

        if(operation.type == 13 && this.stateStatus.cancel == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
            this._cancel(operation.param1,[operation.param3]);
            }
        }

        if(operation.type == 13 && this.stateStatus.cancel == 0) {
             if(isBanned(operation.param3)) {
             let ban = new Message();
             ban.to = operation.param1;
             this._client.sendMessage(0, ban);
             this._cancel(operation.param1,[operation.param3]);
              }

        }

        if(operation.type == 13 && this.stateStatus.lockinvite == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
            this._kickMember(operation.param1,[operation.param2]);
             }

           }

        if(operation.type == 13 && this.stateStatus.lockinvite == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
            }

        }

		if(operation.type == 11 && this.stateStatus.lockupdategroup == 1){//update group (open qr)
		    let seq = new Message();
			seq.to = operation.param1;
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
  this.textMessage("0103",seq,operation.param2,1);
	          }

          }

          if(operation.type == 11 && this.stateStatus.lockupdategroup == 1){
			let seq = new Message();
			seq.to = operation.param1;
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
    this.textMessage("0104",seq,operation.param2,1);
             }

         }

           if(operation.type == 11 && this.stateStatus.lockupdategroup == 1) { //ada update
           // op1 = group nya
           // op2 = yang 'nge' update
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
              this._kickMember(operation.param1,[operation.param2]);
             }

           }

        if(operation.type == 11 && this.stateStatus.lockupdategroup == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
            }

        }


          if(operation.type == 15 && this.stateStatus.bmsg == 1) {
            if(isBanned(operation.param2))
            {
            }
            else if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
         else
            {
             let out = new Message();
             out.to = operation.param1;
             out.text = "Yah kok out sih ☹"
			     this._client.sendMessage(0, out);
             }

            }

            if(operation.type == 17 && this.stateStatus.bmsg == 1) {
            if(isBanned(operation.param2))
            {
            }
            else if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
         else
            {          
               let kam = new Message();
               kam.to = operation.param1;
               kam.text = "Selamat bergabung di group ini ^^"
               this._client.sendMessage(0, kam);
              }

           }

           if(operation.type == 16) {
             let itil = new Message();
             itil.to = operation.param1;
             itil.text = "Hallo, kangen A̶n̶n̶a̶b̶e̶l̶l̶e̶ ̶  ya?"
             this._client.sendMessage(0, itil);
           }

           if(operation.type == 19) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
             let plerrr = new Message();
             plerrr.to = operation.param1;
             plerrr.contentType = 13;
             plerrr.contentMetadata = { mid: operation.param2 };
             this._client.sendMessage(1, plerrr);
             }

           }

           if(operation.type == 17 && this.stateStatus.lockjoin == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
            this._kickMember(operation.param1,[operation.param2]);
             }

           }

           if(operation.type == 17 && this.stateStatus.lockjoin == 0) {
              if(isBanned(operation.param2)) {
                 this._kickMember(operation.param1,[operation.param2]);
              }
           }

           if(operation.type == 19 && this.stateStatus.kick == 1) { //ada kick
            // op1 = group nya
            // op2 = yang 'nge' kick
            // op3 = yang 'di' kick
            if(isAdmin(operation.param3))
              {
               this._invite(operation.param1,[operation.param3]);
               }
             else if(isBot(operation.param3))
               {
                 this._invite(operation.param1,[operation.param3]);
                }
               else if(isStaff(operation.param3))
                {
                  this._invite(operation.param1,[operation.param3]);
                }
             else
                {
                }

            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
               this._kickMember(operation.param1,[operation.param2]);
            } 

        }

        if(operation.type == 19 && this.stateStatus.kick == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
            }

        }

        if(operation.type == 32 && this.stateStatus.lockcancel == 1) { //ada cancel
          // op1 = group nya
          // op2 = yang 'nge' cancel
          // op3 = yang 'di' cancel
            if(isAdmin(operation.param3))
              {
               this._invite(operation.param1,[operation.param3]);
               }
             else if(isBot(operation.param3))
               {
                 this._invite(operation.param1,[operation.param3]);
                }
               else if(isStaff(operation.param3))
                {
                  this._invite(operation.param1,[operation.param3]);
                }
             else
                {
                }

            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
               this._kickMember(operation.param1,[operation.param2]);
            } 

        }

        if(operation.type == 32 && this.stateStatus.lockcancel == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
            }

        }

        if(operation.type == 55){ //ada reader

            const idx = this.checkReader.findIndex((v) => {
                if(v.group == operation.param1) {
                    return v
                }
            })
            if(this.checkReader.length < 1 || idx == -1) {
                this.checkReader.push({ group: operation.param1, users: [operation.param2], timeSeen: [operation.param3] });
            } else {
                for (var i = 0; i < this.checkReader.length; i++) {
                    if(this.checkReader[i].group == operation.param1) {
                        if(!this.checkReader[i].users.includes(operation.param2)) {
                            this.checkReader[i].users.push(operation.param2);
                            this.checkReader[i].timeSeen.push(operation.param3);
                        }
                    }
                }
            }
        }

        if(operation.type == 13) { // diinvite
            if(isAdmin(operation.param2)) {
                return this._acceptGroupInvitation(operation.param1);
            } else {
                return this._rejectGroupInvitation(operation.param1);
            }
        }
        this.getOprationType(operation);
    }

    async cancelAll(gid) {
        let { listPendingInvite } = await this.searchGroup(gid);
        if(listPendingInvite.length > 0){
            this._cancel(gid,listPendingInvite);
        }
    }

    async searchGroup(gid) {
        let listPendingInvite = [];
        let thisgroup = await this._getGroups([gid]);
        if(thisgroup[0].invitee !== null) {
            listPendingInvite = thisgroup[0].invitee.map((key) => {
                return key.mid;
            });
        }
        let listMember = thisgroup[0].members.map((key) => {
            return { mid: key.mid, dn: key.displayName };
        });

        return { 
            listMember,
            listPendingInvite
        }
    }

    setState(seq,param) {
		if(param == 1){
			let isinya = "==== Info Setting ====\n";
			for (var k in this.stateStatus){
                if (typeof this.stateStatus[k] !== 'function') {
					if(this.stateStatus[k]==1){
						isinya += "\n"+firstToUpperCase(k)+" => ON";
					}else{
						isinya += "\n"+firstToUpperCase(k)+" => OFF";
					}
                }
            }this._sendMessage(seq,isinya);
		}else{
        if(isAdmin(seq.from) || isStaff(seq.from)){
            let [ actions , status ] = seq.text.split(' ');
            const action = actions.toLowerCase();
            const state = status.toLowerCase() == 'on' ? 1 : 0;
            this.stateStatus[action] = state;
			let isinya = "|Status Bot|\n";
			for (var k in this.stateStatus){
                if (typeof this.stateStatus[k] !== 'function') {
					if(this.stateStatus[k]==1){
						isinya += "\n"+firstToUpperCase(k)+" => ON";
					}else{
						isinya += "\n"+firstToUpperCase(k)+" => OFF";
					}
                }
            }
            //this._sendMessage(seq,`Status: \n${JSON.stringify(this.stateStatus)}`);
			this._sendMessage(seq,isinya);
        } else {
            this._sendMessage(seq,`Kamu bukan admin`);
        }}
    }

    mention(listMember) {
        let mentionStrings = [''];
        let mid = [''];
        for (var i = 0; i < listMember.length; i++) {
            mentionStrings.push('@'+listMember[i].displayName+'\n');
            mid.push(listMember[i].mid);
        }
        let strings = mentionStrings.join('');
        let member = strings.split('@').slice(1);
        
        let tmp = 0;
        let memberStart = [];
        let mentionMember = member.map((v,k) => {
            let z = tmp += v.length + 1;
            let end = z - 1;
            memberStart.push(end);
            let mentionz = `{"S":"${(isNaN(memberStart[k - 1] + 1) ? 0 : memberStart[k - 1] + 1 ) }","E":"${end}","M":"${mid[k + 1]}"}`;
            return mentionz;
        })
        return {
            names: mentionStrings.slice(1),
            cmddata: { MENTION: `{"MENTIONEES":[${mentionMember}]}` }
        }
    }

    async leftGroupByName(payload) {
        let gid = await this._findGroupByName(payload);
        for (var i = 0; i < gid.length; i++) {
            this._leaveGroup(gid[i]);
        }
    }
    
    async recheck(cs,group) {
        let users;
        for (var i = 0; i < cs.length; i++) {
            if(cs[i].group == group) {
                users = cs[i].users;
            }
        }
        
        let contactMember = await this._getContacts(users);
        return contactMember.map((z) => {
                return { displayName: z.displayName, mid: z.mid };
            });
    }

	async leftGroupByName(payload) {
        let groupID = await this._getGroupsJoined();
	    for(var i = 0; i < groupID.length; i++){
		    let groups = await this._getGroups(groupID);
            for(var ix = 0; ix < groups.length; ix++){
                if(groups[ix].name == payload){
                    this._client.leaveGroup(0,groups[ix].id);
				    break;
                }
            }
	    }
    }

    removeReaderByGroup(groupID) {
        const groupIndex = this.checkReader.findIndex(v => {
            if(v.group == groupID) {
                return v
            }
        })

        if(groupIndex != -1) {
            this.checkReader.splice(groupIndex,1);
        }
    }

    async textMessage(textMessages, seq, param, lockt) {
        let [ cmd, ...payload ] = textMessages.split(' ');
        payload = payload.join(' ');
        let txt = textMessages.toLowerCase();
        let messageID = seq.id;

        const ginfo =  await this._getGroup(seq.to);
        const groupCreator = ('[ginfo.creator.mid]');
        const cot = textMessages.split('@');
        const com = textMessages.split(':');
        const cox = textMessages.split(' ');


        if(cmd == 'cot:cancel') {
            if(payload == 'group') {
                let groupid = await this._getGroupsInvited();

                for (let i = 0; i < groupid.length; i++) {
                    this._rejectGroupInvitation(groupid[i])                    
                }
                return;
            }
                this.cancelAll(seq.to);
            }

		if(vx[1] == "addcontact" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"# CANCELLED");
			}else if(seq.contentType == 13){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let midnya = seq.contentMetadata.mid;
				let listContacts = await this._client.getAllContactIds();
				for(var i = 0; i < listContacts.length; i++){
					if(listContacts[i] == midnya){
						vx[4] = "sudah";
						break;
					}
				}
				let bang = new Message();
				bang.to = seq.to;
				if(vx[4] == "sudah"){
					console.info("sudah");
					bang.text = "Target sudah ada di friendlist";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Berhasil ditambahkan ke friendlist";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else if(cot[1]){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;let midnya = pment;
				let listContacts = await this._client.getAllContactIds();
				for(var i = 0; i < listContacts.length; i++){
					if(listContacts[i] == midnya){
						vx[4] = "sudah";
						break;
					}
				}
				let bang = new Message();
				bang.to = seq.to;
				if(vx[4] == "sudah"){
					console.info("sudah");
					bang.text = "Target sudah ada di friendlist";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Berhasil ditambahkan ke friendlist";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else if(vx[2] == "arg1" && panjang.length > 30 && panjang[0] == "u"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let midnya = txt;
				let listContacts = await this._client.getAllContactIds();
				for(var i = 0; i < listContacts.length; i++){
					if(listContacts[i] == midnya){
						vx[4] = "sudah";
						break;
					}
				}
				let bang = new Message();
				bang.to = seq.to;
				if(vx[4] == "sudah"){
					console.info("sudah");
					bang.text = "Target sudah ada di friendlist";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Berhasil ditambahkan ke friendlist";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else{
				let bang = new Message();
				bang.to = seq.to;
				bang.text = "#cara AddContact\n-Kirim Contact Orang Yang Mau Di Add\n-Kirim Mid Orang Yang Mau Di Add\n-Atau Tag Orang Yang Mau Di Add\n\n# Note :\nDisarankan Untuk Add Contact Khusus Staff Dan Dilarang Untuk Sembarangan Menggunakan Command Ini !";
				this._client.sendMessage(0,bang);
			}
		}

		if(txt == "addcontact" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[2] = "arg1";
			    this._sendMessage(seq,"Kirim kontaknya");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

      if(txt == 'addcontact') {
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
this._sendMessage(seq,"Kamu bukan admin :O");
            }

      }

      if(vx[1] == "cekid" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"# CANCELLED");
			}else if(seq.contentType == 13){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let midnya = seq.contentMetadata.mid;
				let bang = new Message();
				bang.to = seq.to;
				bang.text = midnya;
				this._client.sendMessage(0, bang);
			}else if(txt == "me"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				seq.text = seq.from.toString();
				this._client.sendMessage(0, seq);
			}else if(cot[1]){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let cekid = new Message();
				cekid.to = seq.to;
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				
				cekid.text = JSON.stringify(pment).replace(/"/g , "");
				this._client.sendMessage(0, cekid);
			}else{
				this._sendMessage(seq,"#cara CekId\nTag orangnya / kirim kontak yang mau di-cek idnya !");
			}
		}

		if(txt == "cekid" && !isBanned(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[2] = "arg1";
			    this._sendMessage(seq,"Kirim kontaknya");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

		if(txt == "cekid" && isBanned(seq.from)) {
         this._sendMessage(seq,"Maaf anda termasuk ke banlist");
       }

		if(vx[1] == "msg" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}else if(vx[2] == "arg1" && vx[3] == "mid" && cot[1]){
				let bang = new Message();bang.to = seq.to;
				bang.text = "Apa pesannya?"
				this._client.sendMessage(0,bang);
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let midnya = JSON.stringify(pment);
				vx[4] = midnya;
				vx[2] = "arg2";
			}else if(vx[2] == "arg1" && vx[3] == "mid" && seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let bang = new Message();bang.to = seq.to;
				bang.text = "Apa pesannya?"
				this._client.sendMessage(0,bang);
				vx[4] = midnya;
				vx[2] = "arg2";
			}else if(vx[2] == "arg1" && vx[3] == "mid" && panjang.length > 30){
				this._sendMessage(seq,"Apa pesannya?");
				vx[4] = txt;
				vx[2] = "arg2";
			}else if(vx[2] == "arg2" && vx[3] == "mid"){
				let panjangs = vx[4].split("");
				let kirim = new Message();let bang = new Message();
				bang.to = seq.to;
				if(panjangs[0] == "u"){
					kirim.toType = 0;
				}else if(panjangs[0] == "c"){
					kirim.toType = 2;
				}else if(panjangs[0] == "r"){
					kirim.toType = 1;
				}else{
					kirim.toType = 0;
				}
				bang.text = "Pesan terkirim, Cie di pc sama annabelle";
				kirim.to = vx[4];
				kirim.text = txt;
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";vx[4] = "";
				this._client.sendMessage(0, kirim);
				this._client.sendMessage(0, bang);
			}else{
				this._sendMessage(seq,"#cara Msg\nKirim Kontak orang yang mau dikirimkan pesan !");
			}
		}

      if(txt == "msg" && isStaff(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[3] = "mid";
			    this._sendMessage(seq,"Send Contact");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}


      if(txt == "msg" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[3] = "mid";
			    this._sendMessage(seq,"Send Contact");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

       if(txt == "msg"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin");
             }

      }

      if(txt == 'ban' && this.sendBlacklist == 0 && isAdmin(seq.from)){
         this.sendBlacklist = 1;
         this._sendMessage(seq,'Send contact untuk dibanned')
       }

       if(seq.contentType == 13 && this.sendBlacklist == 1 && isAdmin(seq.from)) {
          seq.contentType = 0;
          this.sendBlacklist = 0;
          banList.push(seq.contentMetadata.mid);
          this._sendMessage(seq,'Berhasil ditambahkan ke banlist');
        }

       if(txt == "ban"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin");
             }

      }

        if(txt == 'unban' && this.sendBlacklist == 0 && isAdmin(seq.from))
{
           this.sendBlacklist = 2;
           this._sendMessage(seq,'Kirim kontak untuk di unban')
           }

           if(seq.contentType == 13 && this.sendBlacklist == 2 && isAdmin(seq.from))
{
              if(!isBanned(seq.contentMetadata.mid)) {
                 seq.contentType = 0;
                 this.sendBlacklist = 0;
                 await this._sendMessage(seq,'Target belum masuk di banlist');
       }
     else
       {
            seq.contentType = 0;
            while (banList[banList.indexOf(seq.contentMetadata.mid)])
        {
            delete banList[banList.indexOf(seq.contentMetadata.mid)];
        }
    this.sendBlacklist = 0;
    await this._sendMessage(seq,'Berhasil dihapus dari banlist');
    }
}

       if(txt == "unban"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin");
             }

      }


		if(txt == "banlist"){
			seq.text = "====> Daftar Banned <====\n";
			for(var i = 0; i < banList.length; i++){
			    let orangnya = await this._getContacts([banList[i]]);
            seq.text += "\n☞ "+orangnya[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

		if(cox[0] == "bcgroup" && isAdmin(seq.from) && cox[1]){
            let listMID = [];
            let bcText = textMessages.split(" ").slice(1).toString().replace(/,/g , " ");
            let bcm = new Message();
            bcm.toType = 0;
	        let listGroups = await this._client.getGroupIdsJoined();listMID.push(listGroups);
			for(var i = 0; i < listMID.length; i++){
		        for(var xi = 0; xi <listMID[i].length; xi++){
		        	bcm.to = listMID[i][xi];
                    let midc = listMID[i][xi].split("");
                    if(midc[0] == "u"){bcm.toType = 0;}else if(midc[0] == "c"){bcm.toType = 2;}else if(midc[0] == "r"){bcm.toType = 1;}else{bcm.toType = 0;}
                    bcm.text = bcText;
                    this._client.sendMessage(0, bcm);
	        	}
            }
        }else if(cox[0] == "bcgroup" && isAdmin(seq.from) &&!cox[1]){this._sendMessage(seq,"#caranya bcgroup textdisini");
        }

        if(cox[0] == "bcgroup") {
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
              this._sendMessage(seq,"Kamu bukan admin");
             }

      }

		if(txt == '0103' && lockt == 1){
			let ax = await this._client.getGroup(seq.to);
			if(ax.preventJoinByTicket === true){}else{ax.preventJoinByTicket = true;await this._client.updateGroup(0, ax);}
		}
		if(txt == '0104' && lockt == 1){
			let ax = await this._client.getGroup(seq.to);
			if(ax.preventJoinByTicket === true){ax.preventJoinByTicket = false;await this._client.updateGroup(0, ax);}else{}
		}

		if(vx[1] == "addstaff" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}else if(cot[1]){
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let msg = new Message();msg.to = seq.to;
				if(isStaff(pment)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = cot[1]+"Sudah berada di stafflist";
					this._client.sendMessage(0,msg);
				}else{
					msg.text = "Berhasil ditambahkan ke stafflist";
					this._client.sendMessage(0, msg);
			        myStaff.push(pment);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let msg = new Message();msg.to = seq.to;
				if(isStaff(midnya)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = "Sudah berada di stafflist";
					this._client.sendMessage(0, msg);
				}else{
					msg.text = "Berhasil ditambahkan ke stafflist";
					this._client.sendMessage(0, msg);
			        myStaff.push(midnya);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				if(isStaff(txt)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					this._sendMessage(seq,"Sudah berada di stafflist");
				}else{
					msg.text = "Berhasil ditambahkan ke stafflist";
					this._client.sendMessage(0, msg);
			        myStaff.push(txt);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else{
					this._sendMessage(seq,"#cara add staff\nKirim kontaknya untuk menambahkan staff !");
			}
		}

		if(txt == "addstaff" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;
			    this._sendMessage(seq,"Kirim kontaknya");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

       if(txt == "addstaff"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan staff");
             }

      }

		if(vx[1] == "delstaff" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}else if(cot[1]){
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let bang = new Message();bang.to = seq.to;
				if(isStaff(pment)){
					let ment = myStaff.indexOf(pment);
					if (ment > -1) {
                        myStaff.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Berhasil dihapus dari staff list";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "Belum masuk ke staff list";
					this._client.sendMessage(0, bang);
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let bang = new Message();bang.to = seq.to;
				if(isStaff(midnya)){
					let ment = myStaff.indexOf(midnya);
					if (ment > -1) {
                        myStaff.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Berhasil dihapus dari staff list";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "Belum masuk ke staff list";
					this._client.sendMessage(0, bang);
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				let bang = new Message();bang.to = seq.to;
				if(isStaff(txt)){
					let ment = myStaff.indexOf(txt);
					if (ment > -1) {
                        myStaff.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Berhasil dihapus dari staff list";
					this._client.sendMessage(0,bang);
				}else{
					this._sendMessage(seq,"Belum masuk ke staff list");
				}
			}else{
				this._sendMessage(seq,"#cara delete Staff\nKirim kontaknya untuk delete staff !");
			}
		}

		if(txt == "delstaff" && isAdmin(seq.from)){
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;
				seq.text = "====>[List Staff C̸͟͞.O̸͟͞.T̸͟͞]<====\n";
				for(var i = 0; i < myStaff.length; i++){
					let orangnya = await this._getContacts([myStaff[i]]);
				    seq.text += "\n☞ "+orangnya[0].displayName+"";
				}
				this._sendMessage(seq,seq.text);
			    this._sendMessage(seq,"Kirim kontaknya");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
		      }
       }

       if(txt == "delstaff"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin");
             }

      }

		if(txt == "stafflist"){
			seq.text = "====> Daftar staff <====\n";
			for(var i = 0; i < myStaff.length; i++){
			    let staff = await this._getContacts([myStaff[i]]);
            seq.text += "\n☞ "+staff[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

        if(txt == 'infogroup') {
           this._sendMessage(seq, '============================\nNama Group :\n============================\n'+ginfo.name+'\n\n============================\nGroup ID :\n============================\n'+ginfo.id+'\n\n============================\nCreator Group :\n============================\n'+ginfo.creator.displayName);
         }

        if(txt == 'respon') {
           if(isAdmin(seq.from) || isStaff(seq.from)) {
            this._sendMessage(seq, 'Annabelle here, my lord');
           }
        }

       if(txt == "respon"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin");
             }

      }

        if(txt == 'help') {
	   if(isAdmin(seq.from) || isStaff(seq.from)) {
             this._sendMessage(seq, '==============================\nA̶n̶n̶a̶b̶e̶l̶l̶e̶ ̶C̶o̶m̶m̶a̶n̶d̶ αll cσmmαnd\n==============================\n☞ me\n☞ Apakah [masukkan kalimat]\n☞ Myid\n☞ Gift\n☞ Halo\n☞ Help\n☞ CreatorBot\n☞ InfoGroup\n☞ GCreator\n☞ Tag\n☞ Speed\n☞ setpoint\n☞ Check\n☞ Status/Setting\n☞ Remove read\n☞ Cancel\n☞ Banlist\n☞ CekID\n☞ StaffList\n☞ join [link group]\n\n==============================\nA̶n̶n̶a̶b̶e̶l̶l̶e̶ ̶ѕтαff ¢σммαи∂\n==============================\n☞ Respon\n☞ OpenUrl\n☞ CloseUrl\n☞ leave\n☞ spam\n☞ spam [jumlah/text]\n☞ Kick On/Off\n☞ Cancel On/Off\n☞ LockInvite On/Off\n☞ LockUpdateGroup On/Off\n☞ LockJoin On/Off\n☞ LockCancel On/Off\n☞ kickall\n☞ Kick「@」\n☞ Msg\n☞ Ban\n☞ Unban\n☞ Bmsg On/Off\n\n==============================\nA̶n̶n̶a̶b̶e̶l̶l̶e̶ α∂мιи ¢σммαи∂\n==============================\n☞ Mute\n☞ Unmute\n☞ addstaff\n☞ delstaff\n☞ BcGroup [Text]\n☞ AddContact\n☞ CreateGroup [Jumlah-Nama/Mid]\n\n==============================\nA̶n̶n̶a̶b̶e̶l̶l̶e̶ ̶B̶o̶t̶n==============================');
	   }
	}

         if(txt == 'status') {
	    if(isAdmin(seq.from) || isStaff(seq.from)) {
               this._sendMessage(seq,`Status: \n${JSON.stringify(this.stateStatus)}\n\n*Note: Jika Status Menunjukkan 0 Itu Berarti Off Dan Jika Status Menunjukkan 1 Itu Berarti On.\n\n-A̶n̶n̶a̶b̶e̶l̶l̶e̶ ̶B̶o̶t̶-`);
	    }
	 }
	    
		if(txt == "setting"){
		    if(isAdmin(seq.from) || isStaff(seq.from)) {
			this.setState(seq,1)
		    }
		}

        //if(txt == 'admin') {
            //this._sendMessage(seq, 'This Is My Admin :\n\n(1.) Negan\nId Line : http://line.me/ti/p/~pasukan_bangsat\n\n(2.) Erin\nId Line : http://line.me/ti/p/~guetuhlupa\n\n(3.) Mia\nId Line : http://line.me/ti/p/~hmrh_may\n\n-тєαм αиυ вσт-');
        //}

        if(txt == 'noob') {
	   if(isAdmin(seq.from) || isStaff(seq.from)) {
               seq.contentType = 7
               seq.contentMetadata = {'STKID':'404','STKPKGID':'1','STKVER':'100'};
               this._client.sendMessage(3, seq);
	   }
	}

          if(txt == 'gift') {
	     if(isAdmin(seq.from) || isStaff(seq.from)) {
                seq.contentType = 9
                seq.contentMetadata = {'PRDID': 'a9ed993f-a4d8-429d-abc0-2692a319afde','PRDTYPE': 'THEME','MSGTPL': '6'};
                this._client.sendMessage(1, seq);
	     }
	  }

        if(txt == 'halo') {
          if(isAdmin(seq.from) || isStaff(seq.from)) {
        this._sendMessage(seq, 'Halo braderr wazap?');
        }
      else
        {
         this._sendMessage(seq, 'eh kntlo lu siapa halo halo?(☄ฺ◣д◢)☄ฺ');
         }
     }



        if(txt == 'speed') {
            const curTime = (Date.now() / 1000);
            await this._sendMessage(seq,'check Connection....');
            const rtime = (Date.now() / 1000) - curTime;
            await this._sendMessage(seq, `${rtime} second(s)`);
        }

        if(txt == 'tag' && isAdmin(seq.from)) {
let { listMember } = await this.searchGroup(seq.to);
     const mentions = await this.mention(listMember);
        seq.contentMetadata = mentions.cmddata; await this._sendMessage(seq,mentions.names.join(''))
        }

        if(txt === 'kickall' && this.stateStatus.kick == 1 && isAdmin(seq.from)) {
            let { listMember } = await this.searchGroup(seq.to);
            for (var i = 0; i < listMember.length; i++) {
                if(!isAdmin(listMember[i].mid)){
                    this._kickMember(seq.to,[listMember[i].mid])
                }
            }
        }
        //if(txt === 'kernelo') {
          //exec('uname -a;ptime;id;whoami',(err, sto) => {
                //this._sendMessage(seq, sto);
            //})
        //}

        if(cmd == 'say' && isAdmin(seq.from)) {
                   const [ j, kata ] = payload.split('/');
                   for(var i = 0; i < j; i++) {
                      this._sendMessage(seq,`${kata}`);
               }
           }
           
        if(txt == 'setpoint') {
	    if(isAdmin(seq.from) || isStaff(seq.from)) {
               this._sendMessage(seq, `Pembacaan Read Dimulai Dari Sekarang.`);
               this.removeReaderByGroup(seq.to);
	    }
	}

        if(txt == 'remove read') {
	   if(isAdmin(seq.from) || isStaff(seq.from)) {

              this.checkReader = []
              this._sendMessage(seq, `Menghapus Data Pembacaan Read`);
	   }  
	}

        if(txt == 'check'){
	   if(isAdmin(seq.from) || isStaff(seq.from)) {

              let rec = await this.recheck(this.checkReader,seq.to);
              const mentions = await this.mention(rec);
              seq.contentMetadata = mentions.cmddata;
              await this._sendMessage(seq,mentions.names.join(''));
            
	   }
	}

         if (txt == 'gcreator') {
             let gcreator = await this._getGroup(seq.to);
             seq.contentType = 13;
             seq.contentMetadata = {mid: gcreator.creator.mid, displayName: gcreator.creator.displayName};
             this._client.sendMessage(1, seq);
         }

        if(txt == 'creator') {
           this._sendMessage(seq, 'sekalian instagram nya\ninstagram.com/fahmiadrn');
           seq.contentType=13;
           seq.contentMetadata = { mid: 'u7b8f35567fee016d196112004b6e3573' };
           this._client.sendMessage(1, seq);
        }

        if(txt == 'me') {
           seq.contentType=13;
           seq.contentMetadata = { mid: seq.from };
           this._client.sendMessage(1, seq);
        }
        
        //if(seq.contentType == 13) {
            //seq.contentType = 0
            //this._sendMessage(seq,seq.contentMetadata.mid);
        //}


        if(txt == 'setpoint for check reader .') {
            this.searchReader(seq);
        }

        if(txt == 'clearall') {
	   if(isAdmin(seq.from) || isStaff(seq.from)) {
              this.checkReader = [];
	   }
        }

		if(txt == "mute" && isAdmin(seq.from)) {
			this.stateStatus.mute = 1;
			this._sendMessage(seq,"(*´﹃｀*)")
		}

       if(txt == "mute" || txt == "unmute"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin");
             }

      }

       if(txt == "openurl" || txt == "closeurl" || txt == "spam" || txt == "bye"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin");
             }

      }

        const action = ['lockinvite on','lockinvite off','lockupdategroup on','lockupdategroup off','lockjoin on','lockjoin off','lockcancel on','lockcancel off','kick on','kick off','cancel on','cancel off','bmsg on','bmsg off']
        if(action.includes(txt)) {
            this.setState(seq)
        }
	
        if(txt == 'myid') {
            this._sendMessage(seq,`MID lu nih jelek : ${seq.from}`);
        }

        const joinByUrl = ['openurl','closeurl'];
      if(joinByUrl.includes(txt) && isAdmin(seq.from)) {
            this._sendMessage(seq,`sabar di proses ...`);
            let updateGroup = await this._getGroup(seq.to);
            updateGroup.preventJoinByTicket = true;
            if(txt == 'openurl') {
                updateGroup.preventJoinByTicket = false;
                const groupUrl = await this._reissueGroupTicket(seq.to)
                this._sendMessage(seq,`QR Code Group = line://ti/g/${groupUrl}`);
            }
            await this._updateGroup(updateGroup);
        }

        //if(cmd == 'join') { //untuk join group pake qrcode contoh: join line://anu/g/anu
            //const [ ticketId ] = payload.split('g/').splice(-1);
            //let { id } = await this._findGroupByTicket(ticketId);
            //await this._acceptGroupInvitationByTicket(id,ticketId);
        //}

           if(cmd == 'Apakah') {
              let optreply_jawab=['Iya','Bisa Jadi','Tidak']
              let random3 = Math.floor(Math.random()*optreply_jawab.length);
              let reply_jawab=(optreply_jawab[random3]);                            this._sendMessage(seq, `${reply_jawab}`);
              }

        if(cmd == 'kick' && isStaff(seq.from)){
           let target = payload.replace('@','');
           let group = await this._getGroups([seq.to]);
           let gm = group[0].members;
              for(var i = 0; i < gm.length; i++){
                     if(gm[i].displayName == target){
                                  target = gm[i].mid;
                     }
               }

               this._kickMember(seq.to,[target]);
        }

        if(cmd == 'kick' && isAdmin(seq.from)){
           let target = payload.replace('@','');
           let group = await this._getGroups([seq.to]);
           let gm = group[0].members;
              for(var i = 0; i < gm.length; i++){
                     if(gm[i].displayName == target){
                                  target = gm[i].mid;
                     }
               }

               this._kickMember(seq.to,[target]);
        }

	if(cmd == 'join') { //untuk join group pake qrcode contoh: join line://anu/g/anu
            const [ ticketId ] = payload.split('g/').splice(-1);
            let { id } = await this._findGroupByTicket(ticketId);
            await this._acceptGroupInvitationByTicket(id,ticketId);
        }
	    
        if(cmd == 'spam' && isStaff(seq.from)) {
            for(var i= 0; i < 10;  i++) {
               this._sendMessage(seq, 'Berisik banget dah');
        }
    }

        if(cmd == 'spam' && isAdmin(seq.from)) {
            for(var i= 0; i < 10;  i++) {
               this._sendMessage(seq, 'Berisik banget dah');
        }
    }

//Tab:CreateGroup <jumlah>-<NamaGrup>/<mid>
//Tab:CreateGroup 100-NamaGrupnya/midkorban
        if(cmd == 'creategroup' && isAdmin(seq.from)) { 
            const [ j, u ] = payload.split('-');
            const [ n, m ] = u.split('/');
            let add = await this._client.findAndAddContactsByMid(seq, `${m}`);
            for (var i = 0; i < j; i++) {
                await this._createGroup(`${n}`,[m]);
             let gid = await this._findGroupByName(`${n}`);
             for (var i = 0; i < gid.length; i++) {
                 this._leaveGroup(gid[i]);
            }
          }
        }
        
        if(txt == 'leave') {
           if(isAdmin(seq.from) || isStaff(seq.from)){
          let txt = await this._sendMessage(seq, 'Bye bye, jangan ada yang kangen');
          this._leaveGroup(seq.to);
        }
    }

        //if(cmd == 'lirik') {
            //let lyrics = await this._searchLyrics(payload);
            //this._sendMessage(seq,lyrics);
        //}

        //if(cmd === 'ip') {
            //exec(`curl ipinfo.io/${payload}`,(err, res) => {
                //const result = JSON.parse(res);
                //if(typeof result.error == 'undefined') {
                    //const { org, country, loc, city, region } = result;
                    //try {
                        //const [latitude, longitude ] = loc.split(',');
                        //let location = new Location();
                        //Object.assign(location,{ 
                            //title: `Location:`,
                            //address: `${org} ${city} [ ${region} ]\n${payload}`,
                            //latitude: latitude,
                            //longitude: longitude,
                            //phone: null 
                        //})
                        //const Obj = { 
                            //text: 'Location',
                            //location : location,
                            //contentType: 0,
                        //}
                        //Object.assign(seq,Obj)
                        //this._sendMessage(seq,'Location');
                    //} catch (err) {
                        //this._sendMessage(seq,'Not Found');
                    //}
                //} else {
                    //this._sendMessage(seq,'Location Not Found , Maybe di dalem goa');
                //}
            //})
        //}
    }

}

module.exports = new LINE();
