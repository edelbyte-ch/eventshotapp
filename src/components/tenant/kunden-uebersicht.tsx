import { AlertTriangle, Camera, PartyPopper, Users, Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CustomerOverview } from '@/lib/admin-data'

function chf(rappen: number) {
  return `CHF ${(rappen / 100).toLocaleString('de-CH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}.-`
}

function datum(d: Date | null) {
  return d ? d.toLocaleDateString('de-CH') : '—'
}

function zahl(n: number) {
  return n.toLocaleString('de-CH')
}

/** Beschriftetes Wertepaar der Kartenansicht. */
function Wert({
  label,
  wert,
  stark,
}: {
  label: string
  wert: string
  stark?: boolean
}) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className={stark ? 'font-medium tabular-nums' : 'tabular-nums'}>
        {wert}
      </dd>
    </div>
  )
}

/**
 * Reine Darstellung — bekommt die Daten als Prop.
 *
 * Getrennt von der Seite, damit die Tabelle sich ohne Datenbank ansehen und
 * pruefen laesst. Die Berechtigungspruefung bleibt in der Seite; eine
 * Darstellungskomponente ist der falsche Ort dafuer.
 */
export function KundenUebersicht({
  daten,
}: {
  daten: CustomerOverview
}) {
  const { kunden, konnteNichtZugeordnet, summe } = daten

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kennzahl label="Kunden" wert={summe.kunden} icon={Users} />
        <Kennzahl
          label="Events"
          wert={`${summe.bezahlteEvents} / ${summe.events}`}
          fuss="bezahlt / gesamt"
          icon={PartyPopper}
        />
        <Kennzahl label="Fotos" wert={summe.fotos.toLocaleString('de-CH')} icon={Camera} />
        <Kennzahl
          label="Umsatz"
          wert={chf(summe.umsatzRappen)}
          fuss="Listenpreise, ohne Rabatte"
          icon={Wallet}
        />
      </div>

      {/* Kaputte Registrierungen zuerst: das ist das Einzige hier, was eine
          Handlung verlangt. Sie entstehen, wenn addTenant nach dem Anlegen des
          Kontos abbricht — der Kunde kommt dann nirgends mehr hin. */}
      {konnteNichtZugeordnet.length > 0 && (
        <Card className="rounded-3xl border-amber-500/30 bg-amber-500/5 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              {konnteNichtZugeordnet.length}{' '}
              {konnteNichtZugeordnet.length === 1 ? 'Konto' : 'Konten'} ohne
              Kundendatensatz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              Die Registrierung ist auf halbem Weg steckengeblieben. Diese
              Leute sehen im Dashboard nichts. Über „Gratis-Event anlegen"
              lassen sie sich einem Event zuordnen — der Kundendatensatz wird
              dabei nachgezogen.
            </p>
            <ul className="divide-y">
              {konnteNichtZugeordnet.map((u) => (
                <li key={u.id} className="flex flex-wrap justify-between gap-2 py-2">
                  <span className="font-medium">{u.name || '—'}</span>
                  <span className="text-muted-foreground">{u.email}</span>
                  <span className="text-muted-foreground tabular-nums">
                    seit {datum(u.seit)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card className="rounded-3xl border-0 bg-card/50 shadow-xl backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Alle Kunden
          </CardTitle>
        </CardHeader>
        <CardContent>
          {kunden.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">
              Noch keine Kunden registriert.
            </p>
          ) : (
            <>
            {/* Mobil Karten statt Tabelle: quer scrollen liesse ausgerechnet
                die Zahlen unsichtbar rechts liegen, um die es hier geht. */}
            <ul className="divide-y lg:hidden">
              {kunden.map((k) => (
                <li key={k.tenantId} className="space-y-3 py-4">
                  <div>
                    <div className="font-medium">{k.name}</div>
                    {k.company && (
                      <div className="text-xs text-muted-foreground">
                        {k.company}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      {k.email}
                      {!k.hatKonto && (
                        <span className="ml-2 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-600">
                          ohne Login
                        </span>
                      )}
                    </div>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <Wert label="Registriert" wert={datum(k.seit)} />
                    <Wert
                      label="Events"
                      wert={`${k.bezahlteEvents} bezahlt · ${k.gratisEvents} gratis`}
                    />
                    <Wert label="Fotos" wert={zahl(k.fotos)} />
                    <Wert
                      label="Demo"
                      wert={
                        k.demoFotos === null
                          ? '—'
                          : `${k.demoFotos}${k.demoGrenze ? ` / ${k.demoGrenze}` : ''}`
                      }
                    />
                    <Wert
                      label="Umsatz"
                      wert={k.umsatzRappen > 0 ? chf(k.umsatzRappen) : '—'}
                      stark
                    />
                  </dl>
                </li>
              ))}
            </ul>

            <div className="hidden lg:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="py-2 pr-4 font-medium">Kunde</th>
                    <th className="py-2 pr-4 font-medium">Registriert</th>
                    <th className="py-2 pr-4 text-right font-medium">Events</th>
                    <th className="py-2 pr-4 text-right font-medium">bezahlt</th>
                    <th className="py-2 pr-4 text-right font-medium">gratis</th>
                    <th className="py-2 pr-6 text-right font-medium">Fotos</th>
                    <th className="py-2 pr-4 font-medium">Demo</th>
                    <th className="py-2 pr-4 text-right font-medium">Umsatz</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {kunden.map((k) => (
                    <tr key={k.tenantId} className="hover:bg-muted/30">
                      <td className="py-3 pr-4">
                        <div className="font-medium">{k.name}</div>
                        {k.company && (
                          <div className="text-xs text-muted-foreground">
                            {k.company}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {k.email}
                          {!k.hatKonto && (
                            <span className="ml-2 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-600">
                              ohne Login
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 pr-4 tabular-nums text-muted-foreground">
                        {datum(k.seit)}
                      </td>
                      <td className="py-3 pr-4 text-right tabular-nums">{k.events}</td>
                      <td className="py-3 pr-4 text-right tabular-nums">
                        {k.bezahlteEvents > 0 ? (
                          <span className="font-medium text-primary">
                            {k.bezahlteEvents}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-right tabular-nums text-muted-foreground">
                        {k.gratisEvents}
                      </td>
                      <td className="py-3 pr-6 text-right tabular-nums">
                        {zahl(k.fotos)}
                      </td>
                      <td className="py-3 pr-4 tabular-nums text-muted-foreground">
                        {k.demoFotos === null
                          ? '—'
                          : `${k.demoFotos}${k.demoGrenze ? ` / ${k.demoGrenze}` : ''}`}
                      </td>
                      <td className="py-3 pr-4 text-right tabular-nums font-medium">
                        {k.umsatzRappen > 0 ? chf(k.umsatzRappen) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}

function Kennzahl({
  label,
  wert,
  fuss,
  icon: Icon,
}: {
  label: string
  wert: string | number
  fuss?: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Card className="rounded-2xl border-0 bg-card/50 shadow-lg backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{label}</span>
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="mt-2 text-3xl font-bold tabular-nums">{wert}</div>
        {fuss && (
          <div className="mt-1 text-xs text-muted-foreground">{fuss}</div>
        )}
      </CardContent>
    </Card>
  )
}

export function KundenSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted/40" />
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-3xl bg-muted/40" />
    </div>
  )
}
