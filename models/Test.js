class Test{
	constructor(name, id) {
		this.name = name;
		this.id = id;
	}

	getTestData() {
		return this.name + ", id: " + this.id; 
	};

	editName(newName) {
		this.name = newName
	}
};



module.exports = Test;


