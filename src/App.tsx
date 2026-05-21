import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { getChampionTheme } from './data/championThemes'
import { champions, laneOptions, regionOptions } from './data/leagueChampions'
import type { LaneKey, RegionKey } from './data/leagueChampions'
import { getAramDisorderRecommendations, getRecommendedBuild } from './data/recommendedBuilds'
import type { RecommendedEntry } from './data/recommendedBuilds'
import './App.css'

type WheelOption = {
  id: string
  label: string
  image?: string
  lanes?: LaneKey[]
  regions?: RegionKey[]
}

type DrawHistoryEntry = {
  id: string
  champion: WheelOption
  build: RecommendedEntry[]
}

type WheelLabelStyle = CSSProperties & {
  '--label-color': string
  '--label-shadow': string
}

type AppView = 'roulette' | 'builds'

const palette = [
  '#2563eb',
  '#db2777',
  '#059669',
  '#ea580c',
  '#7c3aed',
  '#0891b2',
  '#c026d3',
  '#65a30d',
]

function getOptionImage(option: WheelOption) {
  if (option.image) return option.image
  if (!option.regions) return ''

  return `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${option.id}_0.jpg`
}

function getOptionTheme(option: WheelOption, fallbackIndex: number) {
  if (option.regions) {
    return getChampionTheme({ id: option.id, regions: option.regions })
  }

  return {
    background: palette[fallbackIndex % palette.length],
    foreground: '#ffffff',
    shadow: 'dark',
  }
}

function buildSegmentGradient(color: string, start: number, end: number, isDenseWheel: boolean) {
  const middle = start + (end - start) / 2

  if (isDenseWheel) {
    return [
      `color-mix(in srgb, ${color} 54%, #172033) ${start}deg`,
      `color-mix(in srgb, ${color} 72%, #26364d) ${middle}deg`,
      `color-mix(in srgb, ${color} 58%, #b79b46) ${end}deg`,
    ].join(', ')
  }

  return [
    `color-mix(in srgb, ${color} 70%, #0f172a) ${start}deg`,
    `${color} ${middle}deg`,
    `color-mix(in srgb, ${color} 78%, #d4af37) ${end}deg`,
  ].join(', ')
}

function App() {
  const [currentView, setCurrentView] = useState<AppView>(() => (window.location.hash === '#builds' ? 'builds' : 'roulette'))
  const [options, setOptions] = useState<WheelOption[]>([])
  const [buildSearch, setBuildSearch] = useState('')
  const [customOption, setCustomOption] = useState('')
  const [selectedPreset, setSelectedPreset] = useState('')
  const [selectedLane, setSelectedLane] = useState<LaneKey | ''>('')
  const [selectedRegion, setSelectedRegion] = useState<RegionKey | ''>('')
  const [result, setResult] = useState<WheelOption | null>(null)
  const [pendingRemoval, setPendingRemoval] = useState<WheelOption | null>(null)
  const [drawHistory, setDrawHistory] = useState<DrawHistoryEntry[]>([])
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [optionSearch, setOptionSearch] = useState('')

  const wheelBackground = useMemo(() => {
    if (options.length === 0) {
      return 'conic-gradient(#e5e7eb 0deg 360deg)'
    }

    const slice = 360 / options.length
    const isDenseWheel = options.length > 80

    return `conic-gradient(${options
      .map((_, index) => {
        const color = getOptionTheme(options[index], index).background
        return buildSegmentGradient(color, index * slice, (index + 1) * slice, isDenseWheel)
      })
      .join(', ')})`
  }, [options])

  const wheelLabels = options.length > 120 ? options.filter((_, index) => index % 3 === 0) : options
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(optionSearch.trim().toLowerCase()),
  )
  const centerLabel =
    laneOptions.find((lane) => lane.key === selectedLane)?.label ??
    regionOptions.find((region) => region.key === selectedRegion)?.label ??
    (selectedPreset === 'league' ? 'LOL' : 'LOL')
  const centerLabelClassName = centerLabel.length > 6 ? 'compact' : centerLabel.length > 4 ? 'medium' : ''
  const selectedBuildChampion =
    champions.find((champion) => champion.label.toLowerCase() === buildSearch.trim().toLowerCase()) ??
    champions.find((champion) => champion.label.toLowerCase().includes(buildSearch.trim().toLowerCase())) ??
    champions[0]
  const normalBuild = getRecommendedBuild(selectedBuildChampion.id, selectedBuildChampion.lanes)
  const aramDisorder = getAramDisorderRecommendations(selectedBuildChampion.id, selectedBuildChampion.lanes)

  useEffect(() => {
    loadLeaguePreset()
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(window.location.hash === '#builds' ? 'builds' : 'roulette')
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  function navigateTo(view: AppView) {
    setCurrentView(view)
    window.history.pushState(null, '', view === 'builds' ? '#builds' : '#roulette')
  }

  function loadLeaguePreset() {
    setOptions(champions)
    setSelectedPreset('league')
    setSelectedLane('')
    setSelectedRegion('')
    setResult(null)
    setPendingRemoval(null)
    setOptionSearch('')
  }

  function selectLane(lane: LaneKey) {
    const filteredOptions = champions.filter((champion) => champion.lanes.includes(lane))

    setOptions(filteredOptions)
    setSelectedPreset('league')
    setSelectedLane(lane)
    setSelectedRegion('')
    setResult(null)
    setPendingRemoval(null)
    setOptionSearch('')
  }

  function selectRegion(region: RegionKey) {
    const filteredOptions = champions.filter((champion) => champion.regions.includes(region))

    setOptions(filteredOptions)
    setSelectedPreset('league')
    setSelectedLane('')
    setSelectedRegion(region)
    setResult(null)
    setPendingRemoval(null)
    setOptionSearch('')
  }

  function addCustomOption(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const label = customOption.trim()
    if (!label) return

    setOptions((currentOptions) => [
      ...currentOptions,
      { id: `${label}-${crypto.randomUUID()}`, label },
    ])
    setCustomOption('')
    setResult(null)
    setPendingRemoval(null)
  }

  function removeOption(id: string) {
    setOptions((currentOptions) => currentOptions.filter((option) => option.id !== id))
    setResult((currentResult) => (currentResult?.id === id ? null : currentResult))
    setPendingRemoval((currentOption) => (currentOption?.id === id ? null : currentOption))
  }

  function spinWheel() {
    if (isSpinning || options.length === 0) return

    const winnerIndex = Math.floor(Math.random() * options.length)
    const slice = 360 / options.length
    const targetAngle = 360 - (winnerIndex * slice + slice / 2)
    const currentAngle = ((rotation % 360) + 360) % 360
    const correction = (targetAngle - currentAngle + 360) % 360
    const extraSpins = 360 * 6
    const nextRotation = rotation + extraSpins + correction

    setIsSpinning(true)
    setResult(null)
    setPendingRemoval(null)
    setRotation(nextRotation)

    window.setTimeout(() => {
      const winner = options[winnerIndex]
      const build = getRecommendedBuild(winner.id, winner.lanes)

      setResult(winner)
      setPendingRemoval(winner)
      setDrawHistory((currentHistory) => [
        { id: `${winner.id}-${Date.now()}`, champion: winner, build },
        ...currentHistory,
      ].slice(0, 12))
      setIsSpinning(false)
    }, 3900)
  }

  function removeResultFromWheel() {
    if (!pendingRemoval) return

    removeOption(pendingRemoval.id)
    setPendingRemoval(null)
  }

  return (
    <main className="app-shell">
      <section className={currentView === 'builds' ? 'workspace build-workspace' : 'workspace'}>
        {currentView === 'builds' ? (
          <div className="build-page">
            <div className="build-hero">
              <div>
                <span>Rift Roulette</span>
                <h1>Consulta de builds</h1>
              </div>
              <button type="button" onClick={() => navigateTo('roulette')}>
                Voltar para roleta
              </button>
            </div>

            <label className="champion-picker" htmlFor="build-champion">
              <span>Digite um campeao</span>
              <input
                id="build-champion"
                type="text"
                list="champion-options"
                value={buildSearch}
                onChange={(event) => setBuildSearch(event.target.value)}
                placeholder="Ex: Miss Fortune"
              />
              <datalist id="champion-options">
                {champions.map((champion) => (
                  <option key={champion.id} value={champion.label} />
                ))}
              </datalist>
            </label>

            <div className="champion-build-card">
              {getOptionImage(selectedBuildChampion) && (
                <img src={getOptionImage(selectedBuildChampion)} alt="" />
              )}
              <div>
                <span>Campeao selecionado</span>
                <h2>{selectedBuildChampion.label}</h2>
              </div>
            </div>

            <div className="build-grid">
              <section className="build-card">
                <span>Normal Game</span>
                <h2>Build recomendada</h2>
                <div className="build-list large">
                  {normalBuild.map((item) => (
                    <span key={item.label}>
                      {item.image && <img src={item.image} alt="" />}
                      {item.label}
                    </span>
                  ))}
                </div>
              </section>

              <section className="build-card">
                <span>ARAM: Desordem</span>
                <h2>Itens recomendados</h2>
                <div className="build-list large">
                  {aramDisorder.items.map((item) => (
                    <span key={item.label}>
                      {item.image && <img src={item.image} alt="" />}
                      {item.label}
                    </span>
                  ))}
                </div>
              </section>

              <section className="build-card wide">
                <span>ARAM: Desordem</span>
                <h2>Aprimoramentos recomendados</h2>
                <div className="augment-list">
                  {aramDisorder.augments.map((augment) => (
                    <span key={augment.label}>{augment.label}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ) : (
        <div className="wheel-dock">
          <div className={isSpinning ? 'wheel-stage spinning' : 'wheel-stage'}>
            <div className="pointer" aria-hidden="true" />
            <button
              className="wheel-button"
              type="button"
              onClick={spinWheel}
              disabled={isSpinning || options.length === 0}
              aria-label="Girar roleta"
            >
              <div
                className="wheel"
                style={{
                  background: wheelBackground,
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <div className="wheel-labels" aria-hidden="true">
                  {wheelLabels.map((option) => {
                    const originalIndex = options.findIndex((currentOption) => currentOption.id === option.id)
                    const angle = originalIndex * (360 / options.length) + 360 / options.length / 2
                    const theme = getOptionTheme(option, originalIndex)

                    const labelStyle: WheelLabelStyle = {
                      transform: `rotate(${angle}deg) translateY(var(--label-radius))`,
                      '--label-color': theme.foreground,
                      '--label-shadow':
                        theme.shadow === 'light'
                          ? '0 1px 2px rgba(255, 255, 255, 0.72)'
                          : '0 1px 4px rgba(0, 0, 0, 0.72)',
                    }

                    return (
                      <span
                        key={option.id}
                        className="wheel-label"
                        style={labelStyle}
                      >
                        <span>{option.label}</span>
                      </span>
                    )
                  })}
                </div>
              </div>
            </button>
            <div className="wheel-center" aria-hidden="true">
              <span className={centerLabelClassName}>{centerLabel}</span>
            </div>
          </div>

          <div className="result-panel" aria-live="polite">
            <span>Resultado</span>
            <strong>{result?.label ?? (isSpinning ? 'Girando...' : 'Pronto para sortear')}</strong>
            {result && getOptionImage(result) && <img src={getOptionImage(result)} alt="" />}
          </div>

          <div className="history-card">
            <div className="history-heading">
              <span>Historico</span>
              <small>{drawHistory.length} sorteios</small>
            </div>

            {drawHistory.length === 0 ? (
              <p>Nenhum sorteio ainda.</p>
            ) : (
              <ol>
                {drawHistory.map((entry) => (
                  <li key={entry.id}>
                    {getOptionImage(entry.champion) && <img src={getOptionImage(entry.champion)} alt="" />}
                    <div>
                      <strong>{entry.champion.label}</strong>
                      <div className="build-list">
                        {entry.build.map((item) => (
                          <span key={item.label}>
                            {item.image && <img src={item.image} alt="" />}
                            {item.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
        )}
      </section>

      <aside className="control-panel">
        <header>
          <p>Rift Roulette</p>
          <h1>Escolha, filtre e sorteie</h1>
        </header>

        <div className="view-switcher">
          <button
            type="button"
            className={currentView === 'roulette' ? 'active' : ''}
            onClick={() => navigateTo('roulette')}
          >
            Roleta
          </button>
          <button
            type="button"
            className={currentView === 'builds' ? 'active' : ''}
            onClick={() => navigateTo('builds')}
          >
            Builds
          </button>
        </div>

        {currentView === 'roulette' ? (
          <>
        <details className="control-section" open>
          <summary>Filtros</summary>
          <div className="panel-section">
            <span className="section-label">Pre-selecoes</span>
            <button
              className={selectedPreset === 'league' ? 'preset-button active' : 'preset-button'}
              type="button"
              onClick={loadLeaguePreset}
            >
              League of Legends
            </button>
            {selectedPreset === 'league' && <small className="meta">Dados locais editaveis</small>}

            {selectedPreset === 'league' && (
              <div className="lane-card">
                <span className="section-label">Rotas</span>
                <div className="lane-grid">
                  {laneOptions.map((lane) => (
                    <button
                      key={lane.key}
                      type="button"
                      className={selectedLane === lane.key ? 'lane-button active' : 'lane-button'}
                      onClick={() => selectLane(lane.key)}
                    >
                      {lane.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedPreset === 'league' && (
              <div className="region-card">
                <span className="section-label">Regioes</span>
                <div className="region-grid">
                  {regionOptions.map((region) => (
                    <button
                      key={region.key}
                      type="button"
                      className={selectedRegion === region.key ? 'region-button active' : 'region-button'}
                      onClick={() => selectRegion(region.key)}
                    >
                      {region.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </details>

        <details className="control-section">
          <summary>Personalizar</summary>
          <form className="add-form" onSubmit={addCustomOption}>
            <label htmlFor="custom-option">Nova opcao</label>
            <div>
              <input
                id="custom-option"
                type="text"
                value={customOption}
                onChange={(event) => setCustomOption(event.target.value)}
                placeholder="Ex: modo ARAM"
              />
              <button type="submit">Adicionar</button>
            </div>
          </form>
        </details>

        <details className="control-section" open>
          <summary>Opcoes atuais</summary>
          <div className="options-list">
            <div className="options-heading">
              <span className="section-label">Lista</span>
              <small>
                {optionSearch.trim() ? `${filteredOptions.length} de ${options.length}` : `${options.length} itens`}
              </small>
            </div>

            <label className="search-field" htmlFor="option-search">
              <span>Buscar opcao</span>
              <input
                id="option-search"
                type="search"
                value={optionSearch}
                onChange={(event) => setOptionSearch(event.target.value)}
                placeholder="Ex: Miss Fortune"
              />
            </label>

            {options.length === 0 ? (
              <p className="empty-state">Escolha uma pre-selecao ou adicione opcoes.</p>
            ) : filteredOptions.length === 0 ? (
              <p className="empty-state">Nenhuma opcao encontrada.</p>
            ) : (
              <ul>
                {filteredOptions.map((option) => (
                  <li key={option.id}>
                    {getOptionImage(option) && <img src={getOptionImage(option)} alt="" />}
                    <span>{option.label}</span>
                    <button type="button" onClick={() => removeOption(option.id)} aria-label="Remover">
                      x
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </details>
          </>
        ) : (
          <div className="build-side-card">
            <span className="section-label">Consulta</span>
            <p>Digite um campeao na tela de builds para ver recomendacoes de Normal Game e ARAM: Desordem.</p>
          </div>
        )}
      </aside>

      {pendingRemoval && (
        <div className="modal-backdrop" role="presentation">
          <div className="result-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            {getOptionImage(pendingRemoval) && <img src={getOptionImage(pendingRemoval)} alt="" />}
            <span>Resultado sorteado</span>
            <h2 id="modal-title">{pendingRemoval.label}</h2>
            <p>Deseja remover essa opcao da roleta para o proximo giro?</p>
            <div className="modal-actions">
              <button
                type="button"
                className="danger-button"
                onClick={removeResultFromWheel}
                aria-label={`Remover ${pendingRemoval.label} da roleta`}
              >
                Remover
              </button>
              <button type="button" className="ghost-button" onClick={() => setPendingRemoval(null)}>
                Manter
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
