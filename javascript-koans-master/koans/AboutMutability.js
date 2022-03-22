describe("About Mutability", function () {

  it("should expect object properties to be public and mutable", function () {
    var aPerson = { firstname: "John", lastname: "Smith" };
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe('Alan');
  });

  it("should understand that constructed properties are public and mutable", function () {
    function Person(firstname, lastname) {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    var aPerson = new Person("John", "Smith");
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe('Alan');
  });

  it("should expect prototype properties to be public and mutable", function () {
    function Person(firstname, lastname) {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    Person.prototype.getFullName = function () {
      return this.firstname + " " + this.lastname;
    };

    var aPerson = new Person("John", "Smith");
    expect(aPerson.getFullName()).toBe('John Smith');

    aPerson.getFullName = function () {
      return this.lastname + ", " + this.firstname;
    };

    expect(aPerson.getFullName()).toBe('Smith, John');
  });

  it("should know that variables inside a constructor and constructor args are private", function () {
    function Person(firstname, lastname) {
      var fullName = firstname + " " + lastname;

      this.getFirstName = function () { return firstname; };
      this.getLastName = function () { return lastname; };
      this.getFullName = function () { return fullName; };
    }
    var aPerson = new Person("John", "Smith");

    console.log(aPerson.fullname, aPerson.firstname, aPerson.lastname);
    //전부 Private변수이다.
    // undefined undefined undefined

    aPerson.firstname = "Penny";
    aPerson.lastname = "Andrews";
    aPerson.fullName = "Penny Andrews";

    console.log(aPerson.fullname, aPerson.firstname, aPerson.lastname);// undefined 'Penny' 'Andrews'
    //위에서 Public변수가 추가됐기 때문에, Penny와 Andrews가 표시된다..

    //아래함수에서는 여전히 Private변수에 접근한다.
    expect(aPerson.getFirstName()).toBe('John');
    expect(aPerson.getLastName()).toBe('Smith');
    expect(aPerson.getFullName()).toBe('John Smith');

    //getFullName함수를 public변수에 접근하도록 변경한다.
    aPerson.getFullName = function () {
      return aPerson.lastname + ", " + aPerson.firstname;
    };

    expect(aPerson.getFullName()).toBe('Andrews, Penny');
  });

});
