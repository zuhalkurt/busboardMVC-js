class Test{
	constructor(name, id) {
		this.name = name;
		this.id = id;
	}

	showTestData() {
		return this.name + ", id: " + this.id; 
	};

	editName(newName) {
		this.name = newName
	}
};

module.exports = Test;
