
class Test {
    name: string;
    id: number
}
    
export class Collection<T> extends Array<T> {
    groupBy(predicate: (value: T, index: number, obj: Array<T>) => string): Dictionary<T>{
        var data: Dictionary<T> = {};
        for(let $index = 0; $index < this.length; $index++) {
            data[predicate(this[$index], $index, this)] = data[predicate(this[$index], $index, this)] || new Collection<T>();
            data[predicate(this[$index], $index, this)].push(this[$index]);
        }
        return data;
    }
}
export class Dictionary<T> {
    [key: string]: Collection<T>
}

var x: Collection<Test> = new Collection<Test>();
x.push({name: "John", id: 1});
x.push({name: "John", id: 2});
console.log(x.groupBy((x)=>x.name)["John"].length);
