type Listener<T> = (data: T) => void;

export class EventBus<T> {
  private listeners: Listener<T>[] = [];
  subscribe(fn: Listener<T>) { this.listeners.push(fn); }
  publish(data: T) { this.listeners.forEach(fn => fn(data)); }
}
