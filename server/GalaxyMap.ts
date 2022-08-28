import { Planet } from '../models/common';

interface Route {
    from: Planet['code'];
    to: Planet['code'][];
}

interface ChildNode {
    parent?: ChildNode;
    name: Planet['code'];
}

class GalaxyMap {
    private routes: Record<string, Route> = {};

    addRoute(from: string, to: string) {
        if (!this.routes[from]) { // add origin to the map of existing nodes
            this.routes[from] = {from, to: []};
        }

        if (!this.routes[from].to.includes(to)) {
            this.routes[from].to.push(to);
        }

        if (!this.routes[to]) { // add dest to the map of existing nodes
            this.routes[to] = {from: to, to: []};
        }
    }

    getRoute(from: string) {
        return this.routes[from];
    }

    findShortestPath(from: string, to: string) { // breadth first search

        // path doesn't exist if nodes doesn't exist
        if (!this.routes[from] || !this.routes[to]) { 
            return [];
        }

        const visited: ChildNode[] = [];

        const nodes: ChildNode[] = [{name: from}];

        while (nodes.length > 0) {
            const node = nodes.shift() as ChildNode;
            
            const children = this.routes[node.name].to;
            
            children.forEach((child) => {
                const isInVisited = visited.find(({name}) => name === child);
                const isInNodes = nodes.find(({name}) => name === child);

                if (!isInVisited && !isInNodes) {
                    nodes.push({
                        name: child,
                        parent: node,
                    });
                }
            });

            visited.push(node);


            if (node.name === to) {
                break;
            }
        }

        // follow the links from destination to root to find total path
        let currentNode = visited.pop();

        if (currentNode?.name !== to) { // path not found
            return [];
        }
        
        const path: string[] = [];

        while (currentNode) {
            path.unshift(currentNode.name);

            currentNode = currentNode.parent;
        }

        return path;
    }

    isDeadEnd(node: string) {
        const route = this.routes[node];

        return route && route.to.length > 0 ? false : true;
    }
}

export default GalaxyMap;
