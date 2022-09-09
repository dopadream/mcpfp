async function getSkin(username: string): Promise<string | never> {
	if (!valid(username)) return Promise.reject(`${username} is an invalid username`);
	const UUID = await getUUID(username);
	const response = await fetch(`https://frozen-tundra-55986.herokuapp.com/https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`);
	if (!response.ok) return Promise.reject(`Response returned statuscode ${response.status}`);
	const json = await response.json();
	const r = JSON.parse(atob(json.properties[0].value));
	return r.textures.SKIN.url;
}




async function getUUID(username: string): string {
	if (!valid(username)) return Promise.reject(`${username} is an invalid username`);
	const response = await fetch(`https://frozen-tundra-55986.herokuapp.com/https://api.mojang.com/users/profiles/minecraft/${username}`)
	if (!response.ok) return Promise.reject(`${username} does not exist`);
	const json = await response.json();
	return json.id;
}

async function defaultSkin(uuid: string): string {
	if (uuid.length <= 16) {
	  // we can't get the skin type by username
	  return "steve";
	} else {
	  // great thanks to Minecrell for research into Minecraft and Java's UUID hashing!
	  // https://git.io/xJpV
	  // MC uses `uuid.hashCode() & 1` for alex
	  // that can be compacted to counting the LSBs of every 4th byte in the UUID
	  // an odd sum means alex, an even sum means steve
	  // XOR-ing all the LSBs gives us 1 for alex and 0 for steve
	  var lsbs_even = parseInt(uuid[ 7], 16) ^
					  parseInt(uuid[15], 16) ^
					  parseInt(uuid[23], 16) ^
					  parseInt(uuid[31], 16);
	  return lsbs_even ? "alex" : "steve";
	}
  }


function valid(username: string) {
	return username.match(/^[a-z0-9_]{1,16}$/i);
}

export {
	getSkin,
	defaultSkin,
	getUUID,
	valid
}
