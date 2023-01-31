

>>refactor searchbar/filters post-Redux implementation

 1. do i need additional global state
 2. can i use local temporary state to show filtered
  - pros: dont have to worry about creating additional redux actions
  - cons: filters reset on refresh, perhaps only an issue if complex or stacked filtering 


Plan: 
 Q:
  - is redux fast enough to use for storing input field that is displayed in field as well?
 - refactor filter/query funcs to migrate to helpers.js
 - make boolean state (redux because trigger will be in ) to indicate active filter
 - make new state local to receipt component with filtered (map?) receipts


Legend:
+LS = Local State = useState()
+RS = Redux State
+C = Nested Component
+P

App
|
|-Navbar
|  LS filter(bool)
|  LS query(Searchbar input>String)
|  C <Searchbar/>
|  C <FilterBar/><New>(buttons for common filters or categories)
|
|
|-ReceiptList
   P filter(bool)
   C <ReceiptItem>(.map())


