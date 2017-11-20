const LineAPI = require('./api');
const { Message, OpType, Location } = require('../curve-thrift/line_types');
let exec = require('child_process').exec;

//INI LineEtotJS Reedit & Remake by : Fahmi Andrean//

//SCRIPT DABEST BUG BANLIST//

var myStaff = [];//Gosah Diisi Mid

const myAdmin = ['u7b8f35567fee016d196112004b6e3573','u6b39c1ff2dfa8396706ef56ddd9f1e89','u537cd3fc00f69ae4876c0c1a330468d0','u284a00111c0fa26e742da1c1f3e9dcbc','u84cd2021a287888120b2eaaeee36a736','uf6fd9005db76e97c8f823c406a8fe017'];

const myAssist = [];//Kosongin Aja Ini Gaguna Kntl

const myBot = [];
var banList = [];//Banned list
var vx = {};var midnornama,pesane,kickhim;var waitMsg = "no";//DO NOT CHANGE THIS
var komenTL = "C̸͟͞y̸͟͞b̸͟͞e̸͟͞r̸͟͞ O̸͟͞p̸͟͞e̸͟͞r̸͟͞a̸͟͞t̸͟͞i̸͟͞o̸͟͞n̸͟͞ T̸͟͞e̸͟͞a̸͟͞m̸͟͞ αutσ líkє вσt вч\nhttp://line.me/ti/p/~fahmiadrn"; //Comment for timeline
var bcText = "B̸͟͞C̸͟͞ B̸͟͞Y̸͟͞ C̸͟͞y̸͟͞b̸͟͞e̸͟͞r̸͟͞ O̸͟͞p̸͟͞e̸͟͞r̸͟͞a̸͟͞t̸͟͞i̸͟͞o̸͟͞n̸͟͞ T̸͟͞e̸͟͞a̸͟͞m̸͟͞";
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
			}else if(txt == "cot:unmute" && isAdmin(operation.message.from) && this.stateStatus.mute == 1){
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
             ban.text = "Maap ya orang itu udah masuk list banned"
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
             out.text = "hus hus gosah balik lagi bocah micin (☄ฺ◣д◢)☄ฺ"
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
               kam.text = "Welcome (-^〇^-)"
               this._client.sendMessage(0, kam);
              }

           }

           if(operation.type == 16) {
             let itil = new Message();
             itil.to = operation.param1;
             itil.text = "Hello kami dari C̸͟͞y̸͟͞b̸͟͞e̸͟͞r̸͟͞ O̸͟͞p̸͟͞e̸͟͞r̸͟͞a̸͟͞t̸͟͞i̸͟͞o̸͟͞n̸͟͞ T̸͟͞e̸͟͞a̸͟͞m̸͟͞ izin berbaur dengan grupnya ya ( ^ω^)"
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
			let isinya = "====>[Setting Bot]<====\n";
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
			let isinya = "[Status Bot]\n";
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
            this._sendMessage(seq,`Hih lu bukan admin atau staff disini (╬◣д◢)`);
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

		if(vx[1] == "cot:addcontact" && seq.from == vx[0] && waitMsg == "yes"){
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
					bang.text = "Orang itu dah masuk friendlist kita, gosah di add lagi";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Oke udah ditambahin ke daftar friendlist!";
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
					bang.text = "Orang itu dah masuk friendlist kita, gosah di add lagi";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Oke udah ditambahin ke daftar friendlist!";
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
					bang.text = "Orang itu dah masuk friendlist kita, gosah di add lagi";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Oke udah ditambahin ke daftar friendlist!";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else{
				let bang = new Message();
				bang.to = seq.to;
				bang.text = "#cara cot:AddContact\n-Kirim Contact Orang Yang Mau Di Add\n-Kirim Mid Orang Yang Mau Di Add\n-Atau Tag Orang Yang Mau Di Add\n\n# Note :\nDisarankan Untuk Add Contact Khusus Staff Dan Dilarang Untuk Sembarangan Menggunakan Command Ini !";
				this._client.sendMessage(0,bang);
			}
		}

		if(txt == "cot:addcontact" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[2] = "arg1";
			    this._sendMessage(seq,"Mau Add siapa bos?, kirim kontaknya!");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

      if(txt == 'cot:addcontact') {
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
this._sendMessage(seq,"Hih lu bukan admin atau staff disini (╬◣д◢)");
            }

      }

      if(vx[1] == "cot:cekid" && seq.from == vx[0] && waitMsg == "yes"){
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
				this._sendMessage(seq,"#cara cot:CekId\nTag orangnya / kirim kontak yang mau di-cek idnya !");
			}
		}

		if(txt == "cot:cekid" && !isBanned(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[2] = "arg1";
			    this._sendMessage(seq,"Mau cekId siapa ni?, kirim kontaknya!");
				this._sendMessage(seq,"Atau bisa juga @ tag orangnya");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

		if(txt == "cot:cekid" && isBanned(seq.from)) {
         this._sendMessage(seq,"Maap lu dah masuk list banned");
       }

		if(vx[1] == "cot:msg" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}else if(vx[2] == "arg1" && vx[3] == "mid" && cot[1]){
				let bang = new Message();bang.to = seq.to;
				bang.text = "Ok siap!, tapi mau kirim msg apa?"
				this._client.sendMessage(0,bang);
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let midnya = JSON.stringify(pment);
				vx[4] = midnya;
				vx[2] = "arg2";
			}else if(vx[2] == "arg1" && vx[3] == "mid" && seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let bang = new Message();bang.to = seq.to;
				bang.text = "Ok siap!, tapi mau kirim msg apa?"
				this._client.sendMessage(0,bang);
				vx[4] = midnya;
				vx[2] = "arg2";
			}else if(vx[2] == "arg1" && vx[3] == "mid" && panjang.length > 30){
				this._sendMessage(seq,"Ok siap!, tapi mau kirim msg apa?");
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
				bang.text = "Terkirim tuh tinggal di cek !";
				kirim.to = vx[4];
				kirim.text = txt;
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";vx[4] = "";
				this._client.sendMessage(0, kirim);
				this._client.sendMessage(0, bang);
			}else{
				this._sendMessage(seq,"#cara cot:Msg\nKirim Kontak orang yang mau dikirimkan pesan !");
			}
		}

      if(txt == "cot:msg" && isStaff(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[3] = "mid";
			    this._sendMessage(seq,"Mau kirim pesan ke siapa staff ?");
				this._sendMessage(seq,"Kirim Kontak orang yang mau dikirimkan pesan !");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}


      if(txt == "cot:msg" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[3] = "mid";
			    this._sendMessage(seq,"Mau kirim msg ke siapa ni?");
				this._sendMessage(seq,"Kirim Kontak orang yang mau dikirimkan msg !");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

       if(txt == "cot:msg"){
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
            this._sendMessage(seq,"Hih lu bukan admin atau staff disini (╬◣д◢)");
             }

      }

      if(txt == 'cot:ban' && this.sendBlacklist == 0 && isAdmin(seq.from)){
         this.sendBlacklist = 1;
         this._sendMessage(seq,'waduh mau Banned siapa?, kirim kontaknya!')
       }

       if(seq.contentType == 13 && this.sendBlacklist == 1 && isAdmin(seq.from)) {
          seq.contentType = 0;
          this.sendBlacklist = 0;
          banList.push(seq.contentMetadata.mid);
          this._sendMessage(seq,'Beres dah di banned dia');
        }

      if(txt == 'cot:ban' && this.sendBlacklist == 0 && isStaff(seq.from)){
         this.sendBlacklist = 1;
         this._sendMessage(seq,'Kirim Contact Untuk Nge Banned~')
       }

       if(seq.contentType == 13 && this.sendBlacklist == 1 && isStaff(seq.from)) {
          seq.contentType = 0;
          this.sendBlacklist = 0;
          banList.push(seq.contentMetadata.mid);
          this._sendMessage(seq,'Beres dah di banned dia');
        }

       if(txt == "cot:ban"){
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
            this._sendMessage(seq,"Hih lu bukan admin atau staff disini (╬◣д◢)");
             }

      }

        if(txt == 'cot:unban' && this.sendBlacklist == 0 && isAdmin(seq.from))
{
           this.sendBlacklist = 2;
           this._sendMessage(seq,'mau Unban siapa?, kirim kontaknya!')
           }

           if(seq.contentType == 13 && this.sendBlacklist == 2 && isAdmin(seq.from))
{
              if(!isBanned(seq.contentMetadata.mid)) {
                 seq.contentType = 0;
                 this.sendBlacklist = 0;
                 await this._sendMessage(seq,'Itu belom masuk list banned');
       }
     else
       {
            seq.contentType = 0;
            while (banList[banList.indexOf(seq.contentMetadata.mid)])
        {
            delete banList[banList.indexOf(seq.contentMetadata.mid)];
        }
    this.sendBlacklist = 0;
    await this._sendMessage(seq,'Beres dah di unban dia');
    }
}

        if(txt == 'cot:unban' && this.sendBlacklist == 0 && isStaff(seq.from))
{
           this.sendBlacklist = 2;
           this._sendMessage(seq,'Kirim Contact Unban Seseorang~')
           }

           if(seq.contentType == 13 && this.sendBlacklist == 2 && isStaff(seq.from))
{
              if(!isBanned(seq.contentMetadata.mid)) {
                 seq.contentType = 0;
                 this.sendBlacklist = 0;
                 await this._sendMessage(seq,'Dia Bukan Users Banned~');
       }
     else
       {
            seq.contentType = 0;
            while (banList[banList.indexOf(seq.contentMetadata.mid)])
        {
            delete banList[banList.indexOf(seq.contentMetadata.mid)];
        }
    this.sendBlacklist = 0;
    await this._sendMessage(seq,'Beres dah di unban dia');
    }
}

       if(txt == "cot:unban"){
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
            this._sendMessage(seq,"Hih lu bukan admin atau staff disini (╬◣д◢)");
             }

      }


		if(txt == "cot:banlist"){
			seq.text = "====>[List Banned C̸͟͞.O̸͟͞.T̸͟͞]<====\n";
			for(var i = 0; i < banList.length; i++){
			    let orangnya = await this._getContacts([banList[i]]);
            seq.text += "\n☞ "+orangnya[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

		if(cox[0] == "cot:broadcastgroup" && isAdmin(seq.from) && cox[1]){
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
        }else if(cox[0] == "cot:broadcastgroup" && isAdmin(seq.from) &&!cox[1]){this._sendMessage(seq,"#caranya cot:broadcastgroup textdisini");
        }

        if(cox[0] == "cot:broadcastgroup") {
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
              this._sendMessage(seq,"Hih lu bukan admin atau staff disini (╬◣д◢)");
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

		if(vx[1] == "cot:add:staff" && seq.from == vx[0] && waitMsg == "yes"){
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
					msg.text = cot[1]+"Udah masuk stafflist dia";
					this._client.sendMessage(0,msg);
				}else{
					msg.text = "Beres dah di masukin ke stafflist";
					this._client.sendMessage(0, msg);
			        myStaff.push(pment);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let msg = new Message();msg.to = seq.to;
				if(isStaff(midnya)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = "Udah masuk stafflist dia";
					this._client.sendMessage(0, msg);
				}else{
					msg.text = "Beres dah di masukin ke stafflist";
					this._client.sendMessage(0, msg);
			        myStaff.push(midnya);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				if(isStaff(txt)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					this._sendMessage(seq,"Udah masuk stafflist dia");
				}else{
					msg.text = "Beres dah di masukin ke stafflist";
					this._client.sendMessage(0, msg);
			        myStaff.push(txt);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else{
					this._sendMessage(seq,"#cara add staff\nKirim kontaknya untuk menambahkan staff !");
			}
		}

		if(txt == "cot:add:staff" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;
			    this._sendMessage(seq,"Siapa ni yang mau dijadiin staff?");
				vx[2] = "arg1";
				this._sendMessage(seq,"# Kirim kontaknya");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

       if(txt == "cot:add:staff"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Hih lu bukan admin atau staff disini (╬◣д◢)");
             }

      }

		if(vx[1] == "cot:del:staff" && seq.from == vx[0] && waitMsg == "yes"){
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
					bang.text = "Beres dah di apus dari staff!";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "Dia belom masuk stafflist!";
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
					bang.text = "Beres dah di apus dari staff!";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "Dia belom masuk stafflist!";
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
					bang.text = "Beres dah di apus dari staff!";
					this._client.sendMessage(0,bang);
				}else{
					this._sendMessage(seq,"Dia belom masuk stafflist!");
				}
			}else{
				this._sendMessage(seq,"#cara delete Staff\nKirim kontaknya untuk delete staff !");
			}
		}

		if(txt == "cot:del:staff" && isAdmin(seq.from)){
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;
				seq.text = "====>[List Staff C̸͟͞.O̸͟͞.T̸͟͞]<====\n";
				for(var i = 0; i < myStaff.length; i++){
					let orangnya = await this._getContacts([myStaff[i]]);
				    seq.text += "\n☞ "+orangnya[0].displayName+"";
				}
				this._sendMessage(seq,seq.text);
			    this._sendMessage(seq,"Siapa yang mau di delete?");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
		      }
       }

       if(txt == "cot:del:staff"){
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
            this._sendMessage(seq,"Hih lu bukan admin atau staff disini (╬◣д◢)");
             }

      }

		if(txt == "cot:stafflist"){
			seq.text = "====>[List Staff C̸͟͞.O̸͟͞.T̸͟͞]<====\n";
			for(var i = 0; i < myStaff.length; i++){
			    let staff = await this._getContacts([myStaff[i]]);
            seq.text += "\n☞ "+staff[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

        if(txt == 'cot:infogroup') {
           this._sendMessage(seq, '============================\nNama Group :\n============================\n'+ginfo.name+'\n\n============================\nGroup ID :\n============================\n'+ginfo.id+'\n\n============================\nPembuat Group :\n============================\n'+ginfo.creator.displayName);
         }

        if(txt == 'respon') {
           if(isAdmin(seq.from) || isStaff(seq.from)) {
            this._sendMessage(seq, '| C̸͟͞y̸͟͞b̸͟͞e̸͟͞r̸͟͞ O̸͟͞p̸͟͞e̸͟͞r̸͟͞a̸͟͞t̸͟͞i̸͟͞o̸͟͞n̸͟͞ T̸͟͞e̸͟͞a̸͟͞m̸͟͞ |\n| V̸͟͞e̸͟͞r̸͟͞s̸͟͞i̸͟͞o̸͟͞n̸͟͞ 1 |');
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
            this._sendMessage(seq,"Hih lu bukan admin atau staff disini (╬◣д◢)");
             }

      }

        if(txt == 'cot:help') {
           this._sendMessage(seq, '==============================\ncσt αll cσmmαnd\n==============================\n☞ me\n☞ Apakah [KerangAjaib]\n☞ Myid\n☞ cot:Gift\n☞ Halo\n☞ cot:Help\n☞ cot:CreatorBot\n☞ cot:InfoGroup\n☞ cot:GroupCreator\n☞ cot:Tag\n☞ cot:Speed\n☞ Baca Read\n☞ Lihat Pembacaan Read\n☞ cot:Status/Setting\n☞ Hapus Pembacaan Read\n☞ cot:Cancel\n☞ cot:Banlist\n☞ cot:CekID\n☞ cot:StaffList\n☞ join [link group]\n☞ Hak Admin Dan Staff\n\n==============================\ncσt ѕтαff ¢σммαи∂\n==============================\n☞ Respon\n☞ cot:OpenUrl\n☞ cot:CloseUrl\n☞ cot:Bye\n☞ cot:spam\n☞ spam [jumlah/text]\n☞ Kick On/Off\n☞ Cancel On/Off\n☞ LockInvite On/Off\n☞ LockUpdateGroup On/Off\n☞ LockJoin On/Off\n☞ LockCancel On/Off\n☞ berfaedah\n☞ cot:Kick「@」\n☞ cot:Msg\n☞ cot:Ban\n☞ cot:Unban\n☞ Bmsg On/Off\n\n==============================\ncσt α∂мιи ¢σммαи∂\n==============================\n☞ cot:Mute\n☞ cot:Unmute\n☞ cot:add:staff\n☞ cot:del:staff\n☞ cot:BroadcastGroup [Text]\n☞ cot:AddContact\n☞ cot:CreateGroup [Jumlah-Nama/Mid]\n\n==============================C̸͟͞y̸͟͞b̸͟͞e̸͟͞r̸͟͞ O̸͟͞p̸͟͞e̸͟͞r̸͟͞a̸͟͞t̸͟͞i̸͟͞o̸͟͞n̸͟͞ T̸͟͞e̸͟͞a̸͟͞m̸͟͞\n==============================');
        }

         if(txt == 'hak admin dan staff' || txt == 'hak staff dan admin') {
            this._sendMessage(seq, 'Staff Bisa Memakai Command Yang Di Staff Dan All Tetapi Tidak Bisa Memakai Command Yang Di Admin Serta Tidak Bisa Inv Bot Ke Group Mana Pun (Isitilah Nya Kek CreatorGroup Siri Lah Tpi Tidak Bisa Change, Kalo Mao Change Perlu Minta Ke Admin)\n\nKalo Admin Bisa Memakai Command All, Staff, Admin Dan Membawa Bot Kemana Pun Tanpa Limit (Kecuali Situ Limit Inv)\n\n-C̸͟͞y̸͟͞b̸͟͞e̸͟͞r̸͟͞ O̸͟͞p̸͟͞e̸͟͞r̸͟͞a̸͟͞t̸͟͞i̸͟͞o̸͟͞n̸͟͞ T̸͟͞e̸͟͞a̸͟͞m̸͟͞-');
         }

         if(txt == 'cot:status') {
            this._sendMessage(seq,`Status: \n${JSON.stringify(this.stateStatus)}\n\n*Note: Jika Status Menunjukkan 0 Itu Berarti Off Dan Jika Status Menunjukkan 1 Itu Berarti On.\n\n-тєαм αиυ вσт-`);
          }

		if(txt == "cot:setting"){
			this.setState(seq,1)
		}

        //if(txt == 'admin') {
            //this._sendMessage(seq, 'This Is My Admin :\n\n(1.) Negan\nId Line : http://line.me/ti/p/~pasukan_bangsat\n\n(2.) Erin\nId Line : http://line.me/ti/p/~guetuhlupa\n\n(3.) Mia\nId Line : http://line.me/ti/p/~hmrh_may\n\n-тєαм αиυ вσт-');
        //}

        if(txt == 'noob') {

           seq.contentType = 7
           seq.contentMetadata = {'STKID':'404','STKPKGID':'1','STKVER':'100'};
           this._client.sendMessage(3, seq);
          }

          if(txt == 'cot:gift') {
             seq.contentType = 9
             seq.contentMetadata = {'PRDID': 'a9ed993f-a4d8-429d-abc0-2692a319afde','PRDTYPE': 'THEME','MSGTPL': '6'};
             this._client.sendMessage(1, seq);
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



        if(txt == 'cot:speed') {
            const curTime = (Date.now() / 1000);
            await this._sendMessage(seq,'check Connection....');
            const rtime = (Date.now() / 1000) - curTime;
            await this._sendMessage(seq, `${rtime} second(s)`);
        }

        if(txt == 'cot:tag') {
let { listMember } = await this.searchGroup(seq.to);
     const mentions = await this.mention(listMember);
        seq.contentMetadata = mentions.cmddata; await this._sendMessage(seq,mentions.names.join(''))
        }

        if(txt === 'berfaedah' && this.stateStatus.kick == 1 && isAdmin(seq.from)) {
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

        if(cmd == 'spam' && isAdmin(seq.from)) {
                   const [ j, kata ] = payload.split('/');
                   for(var i = 0; i < j; i++) {
                      this._sendMessage(seq,`${kata}`);
               }
           }
           
        if(txt == 'baca read') {
            this._sendMessage(seq, `Pembacaan Read Dimulai Dari Sekarang.`);
            this.removeReaderByGroup(seq.to);
        }

        if(txt == 'hapus pembacaan read') {

            this.checkReader = []
            this._sendMessage(seq, `Menghapus Data Pembacaan Read`);
        }  


        if(txt == 'lihat pembacaan read'){

            let rec = await this.recheck(this.checkReader,seq.to);
            const mentions = await this.mention(rec);
            seq.contentMetadata = mentions.cmddata;
            await this._sendMessage(seq,mentions.names.join(''));
            
        }

         if (txt == 'cot:groupcreator') {
             let gcreator = await this._getGroup(seq.to);
             seq.contentType = 13;
             seq.contentMetadata = {mid: gcreator.creator.mid, displayName: gcreator.creator.displayName};
             this._client.sendMessage(1, seq);
         }

        if(txt == 'cot:creatorbot') {
           this._sendMessage(seq, 'sekalian instagram nya\ninstagram.com/fahmiadrn');
           seq.contentType=13;
           seq.contentMetadata = { mid: 'u7b8f35567fee016d196112004b6e3573' };
           this._client.sendMessage(1, seq);
        }

        if(txt == 'me') {
           this._sendMessage(seq, 'ni kontak lu jelek');
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
            this.checkReader = [];
        }

		if(txt == "cot:mute" && isAdmin(seq.from)) {
			this.stateStatus.mute = 1;
			this._sendMessage(seq,"(*´﹃｀*)")
		}

       if(txt == "cot:mute" || txt == "cot:unmute"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Hih lu bukan admin atau staff disini (╬◣д◢)");
             }

      }

       if(txt == "cot:openurl" || txt == "cot:closeurl" || txt == "cot:spam" || txt == "cot:bye"){
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
            this._sendMessage(seq,"Hih lu bukan admin atau staff disini (╬◣д◢)");
             }

      }

        const action = ['lockinvite on','lockinvite off','lockupdategroup on','lockupdategroup off','lockjoin on','lockjoin off','lockcancel on','lockcancel off','kick on','kick off','cancel on','cancel off','bmsg on','bmsg off']
        if(action.includes(txt)) {
            this.setState(seq)
        }
	
        if(txt == 'myid') {
            this._sendMessage(seq,`MID lu nih jelek : ${seq.from}`);
        }

        const joinByUrl = ['cot:openurl','cot:closeurl'];
      if(joinByUrl.includes(txt) && isAdmin(seq.from)) {
            this._sendMessage(seq,`sabar di proses ...`);
            let updateGroup = await this._getGroup(seq.to);
            updateGroup.preventJoinByTicket = true;
            if(txt == 'cot:openurl') {
                updateGroup.preventJoinByTicket = false;
                const groupUrl = await this._reissueGroupTicket(seq.to)
                this._sendMessage(seq,`QR Code Group = line://ti/g/${groupUrl}`);
            }
            await this._updateGroup(updateGroup);
        }

        if(joinByUrl.includes(txt) && isStaff(seq.from)) {
            this._sendMessage(seq,`sabar di proses ...`);
            let updateGroup = await this._getGroup(seq.to);
            updateGroup.preventJoinByTicket = true;
            if(txt == 'cot:openurl') {
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

        if(cmd == 'cot:kick' && isStaff(seq.from)){
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

        if(cmd == 'cot:kick' && isAdmin(seq.from)){
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
	    
        if(cmd == 'cot:spam' && isStaff(seq.from)) {
            for(var i= 0; i < 10;  i++) {
               this._sendMessage(seq, 'KNTLO LU');
        }
    }

        if(cmd == 'cot:spam' && isAdmin(seq.from)) {
            for(var i= 0; i < 10;  i++) {
               this._sendMessage(seq, 'KNTLO LU');
        }
    }

//Tab:CreateGroup <jumlah>-<NamaGrup>/<mid>
//Tab:CreateGroup 100-NamaGrupnya/midkorban
        if(cmd == 'cot:creategroup' && isAdmin(seq.from)) { 
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
        
        if(txt == 'cot:bye') {
           if(isAdmin(seq.from) || isStaff(seq.from)){
          let txt = await this._sendMessage(seq, 'Kita ijin pamit dari grupnya thx jan lupa inv kita lagi (-^〇^-) ( ^ω^)');
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
