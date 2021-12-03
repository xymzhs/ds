/**
 * A Graph is a collection of vertices and edges that connect all or some of those vertices together.
 * A Graph may be directed or undirected. In a directed graph each edge has a direction (like a one-way street).
 * You may access an end-node from a start-node but not the other way around.
 * In undirected graphs the edges don’t have a specific direction (like a two-way street) and thus every two vertices that are connected together have access to each other.
 *
 * What is a vertex?
 * A vertex is a basic unit used in graphs to represent data. The terms “node” and “vertex” are used interchangeably to describe how data is represented in graphs. ]
 * Vertices (the plural form of vertex) are connected by edges.
 *
 * If two vertices are connected to each other by one edge, we call these vertices adjacent or neighbors.
 *
 * The sequence of edges between two vertices is called a path.
 *
 * When there are vertices that are unreachable
 * we call this type of graph a disconnected graph. If every pair of vertices in a graph has an edge,
 * it is called a connected graph
 *
 * Graphs can also have cycles.
 * If a graph doesn’t have cycles it is called acyclic graph.
 * A weighted graph is a graph where each edge has a weight associated with it.
 *
 *
 * Graphs are normally being represented as adjacency lists or adjacency matrices.
 *
 * Adjacency Matrix:
 *
 *               A   B   C   D
 *          A    0   1   1   0
 *          B    1   0   1   0
 *          C    1   1   0   1
 *          D    0   0   1   0
 *
 * Adjacency List(this lib used):
 *
 *          A -> B -> C
 *          B -> C
 *          C -> B -> D
 *          D
 *
 * Adjacency Matrix and Adjacency List Comparison
 * Graph related algorithms may be implemented using adjacency matrix or adjacency list interchangeably.
 * The difference is that for some algorithms one way of implementing the graphs may be more efficient than other depending on the operations that are going to be performed on the graph.
 *
 * Application
 * • Maps applications use graphs to compute shortest paths between vertices (addresses, cities,locations).
 * • Social networks use graphs for friends suggestion algorithms.
 * • Package managers use graphs to calculate correct order of installing packages based on their dependencies.
 * • Search engines use graphs to analyze page relevance. In graphs used by search engines, the web-page is a vertex and the link from this web-page to another is directed edge.
 * • Network providers use graphs to analyze network traffic and security. In this case each vertex has an IP address and every edge represent the network packets that flow between different IP addresses.
 *
 * The most common and basic graph operations are:
 * • Add/delete vertex to the graph.
 * • Add/delete edge (connection) between two vertices.
 * • Get all neighbors of the vertex.
 * • Check if two vertices are connected.
 * • Find a vertex by its value
 */

import { LinkedList, LinkedListNode } from "./LinkedList";

class GraphVertex<T> {
  constructor(public value: T, public edges = new LinkedList<GraphEdge<T>>()) {}

  addEdge(edge: GraphEdge<T>) {
    this.edges.append(edge);
    return this;
  }

  deleteEdge(edge: GraphEdge<T>) {
    this.edges.remove(edge);
  }

  getEdges(): GraphEdge<T>[] {
    return this.edges
      .toArray()
      .map(
        (linkedListNode: LinkedListNode<GraphEdge<T>>) => linkedListNode.value
      );
  }

  hasEdge(requiredEdge: GraphEdge<T>) {
    const edgeNode = this.edges.indexOf(requiredEdge);
    return !!edgeNode;
  }

  getNeighbors() {
    const edges = this.edges.toArray();
    const neighborsConverter = (node: LinkedListNode<GraphEdge<T>>) => {
      const edge = node.value;
      const neighbor =
        edge.startVertex === this ? edge.endVertex : edge.startVertex;
      return { ...neighbor, edge };
    };

    return edges.map(neighborsConverter);
  }

  hasNeighbor(vertex: GraphVertex<T>) {
    const edgeToNeighbor = this.edges.find(
      (edge) => edge.startVertex === vertex || edge.endVertex === vertex
    );
    return !!edgeToNeighbor;
  }

  findEdge(vertex: GraphVertex<T>) {
    const edgeFinder = (edge: GraphEdge<T>) => {
      return edge.startVertex === vertex || edge.endVertex === vertex;
    };

    const edge = this.edges.find(edgeFinder);
    return edge ? edge.value : null;
  }

  deleteAllEdges() {
    this.getEdges().forEach((edge) => this.deleteEdge(edge));
    return this;
  }

  getKey() {
    return this.value;
  }

  toString() {
    return `${this.value}`;
  }
}

export class GraphEdge<T> {
  constructor(
    public startVertex: GraphVertex<T>,
    public endVertex: GraphVertex<T>,
    public weight: number = 0
  ) {}

  getKey() {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();

    return `${startVertexKey}_${endVertexKey}`;
  }

  /**
   * Convert edge to string.
   * @return {string}
   */
  toString() {
    return this.getKey();
  }
}

export class Graph<T> {
  constructor(
    public vertices = Object.create({}),
    public edges = Object.create({}),
    public isDirected = false
  ) {}
  addVertex(newVertex: GraphVertex<T>) {
    this.vertices[newVertex.getKey()] = newVertex;
    return this;
  }
  getVertexByKey(vertexKey: T) {
    return this.vertices[vertexKey];
  }

  getAllVertices() {
    return Object.values(this.vertices);
  }

  getAllEdges() {
    return Object.values(this.edges);
  }

  addEdge(edge: GraphEdge<T>) {
    // Try to find and end start vertices.
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());

    // Insert start vertex if it wasn't inserted.
    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }

    // Insert end vertex if it wasn't inserted.
    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }

    // Check if edge has been already added.
    if (this.edges[edge.getKey()]) {
      throw new Error("Edge has already been added before");
    } else {
      this.edges[edge.getKey()] = edge;
    }

    // Add edge to the vertices.
    if (this.isDirected) {
      // If graph IS directed then add the edge only to start vertex.
      startVertex.addEdge(edge);
    } else {
      // If graph ISN'T directed then add the edge to both vertices.
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }
    return this;
  }

  deleteEdge(edge: GraphEdge<T>) {
    // Delete edge from the list of edges.
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()];
    } else {
      throw new Error("Edge not found in graph");
    }

    // Try to find and end start vertices and delete edge from them.
    const startVertex = this.getVertexByKey(edge.startVertex.getKey());
    const endVertex = this.getVertexByKey(edge.endVertex.getKey());

    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);
  }

  findEdge(startVertex: GraphVertex<T>, endVertex: GraphVertex<T>) {
    const vertex = this.getVertexByKey(startVertex.getKey());

    if (!vertex) {
      return null;
    }

    return vertex.findEdge(endVertex);
  }

  toString() {
    return Object.keys(this.vertices).toString();
  }
}
