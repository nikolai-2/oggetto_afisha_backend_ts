export class PeriodProcessor {
  public static get(period: number): string {
    switch (period) {
      case 86400:
        return 'каждый день';
      case 604800:
        return 'каждую неделю';
      case 1209600:
        return 'раз в две недели';
      case 2629743:
        return 'каждый месяц';
      case 31556926:
        return 'каждый год';
    }
  }
}
