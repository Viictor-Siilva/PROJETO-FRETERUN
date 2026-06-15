import { StyleSheet } from 'react-native';
import { COLORS } from './constants';

export const commonStyles = StyleSheet.create({
  // ─── CONTAINERS ───────────────────────────────────────
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  // ─── NAVEGAÇÃO ────────────────────────────────────────
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff08',
  },
  navLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navLogoTxt: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 1.5,
  },
  navBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  navBtnTxt: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '700',
  },

  // ─── HERO ─────────────────────────────────────────────
  hero: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 48,
    backgroundColor: '#050505',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#16A34A20',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#16A34A40',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.green,
  },
  badgeTxt: {
    fontSize: 11,
    color: COLORS.green,
    fontWeight: '600',
  },
  heroTitulo: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 44,
    marginBottom: 16,
  },
  heroSub: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 22,
    marginBottom: 28,
  },
  heroBtns: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },

  // ─── SEÇÕES ───────────────────────────────────────────
  secao: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#ffffff06',
  },
  secaoLabel: {
    fontSize: 10,
    color: COLORS.green,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  secaoTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 18,
  },

  // ─── BOTÕES ───────────────────────────────────────────
  btnVerde: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.green,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  btnVerdeTxt: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  btnBorda: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.green,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  btnBordaTxt: {
    color: COLORS.green,
    fontWeight: '700',
    fontSize: 14,
  },
  btnCancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#EF444410',
    borderWidth: 1,
    borderColor: '#EF444430',
    borderRadius: 12,
    height: 48,
  },

  // ─── CAMPOS DE ENTRADA ────────────────────────────────
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.input,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 12,
  },
  campoInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
  },
  label: {
    fontSize: 10,
    color: COLORS.muted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },

  // ─── CARDS ────────────────────────────────────────────
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 14,
  },
  cardTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },

  // ─── AVATAR ───────────────────────────────────────────
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  // ─── TEXTO ────────────────────────────────────────────
  greeting: {
    fontSize: 21,
    fontWeight: '800',
    color: COLORS.white,
  },
  greetingSub: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },

  // ─── DIVIDER ───────────────────────────────────────────
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 16,
  },
  divLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  divTxt: {
    fontSize: 12,
    color: COLORS.dim,
  },

  // ─── FOOTER ───────────────────────────────────────────
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#ffffff06',
    alignItems: 'center',
    gap: 4,
  },
  footerTxt: {
    fontSize: 11,
    color: COLORS.dim,
  },
});
