PGDMP     -    '            
    y            OtvorenoRacunarstvo    13.2    13.2     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    17281    OtvorenoRacunarstvo    DATABASE     t   CREATE DATABASE "OtvorenoRacunarstvo" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Croatian_Croatia.1250';
 %   DROP DATABASE "OtvorenoRacunarstvo";
                postgres    false            ?            1259    17326    mjerenje    TABLE     ?   CREATE TABLE public.mjerenje (
    tlak integer NOT NULL,
    vrijeme time without time zone NOT NULL,
    datum date NOT NULL,
    postaja character varying(10) NOT NULL,
    "mjerenjeID" integer NOT NULL
);
    DROP TABLE public.mjerenje;
       public         heap    postgres    false            ?            1259    17342    mjerenje_mjerenjeID_seq    SEQUENCE     ?   CREATE SEQUENCE public."mjerenje_mjerenjeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."mjerenje_mjerenjeID_seq";
       public          postgres    false    204            ?           0    0    mjerenje_mjerenjeID_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."mjerenje_mjerenjeID_seq" OWNED BY public.mjerenje."mjerenjeID";
          public          postgres    false    205            ?            1259    17358 
   mjeritelji    TABLE     t   CREATE TABLE public.mjeritelji (
    "idMjerenja" integer NOT NULL,
    mjeritelj character varying(11) NOT NULL
);
    DROP TABLE public.mjeritelji;
       public         heap    postgres    false            ?            1259    17300    mjesto    TABLE     ?   CREATE TABLE public.mjesto (
    pbr integer NOT NULL,
    nazmjesto character varying(40) NOT NULL,
    sifzupanija smallint
);
    DROP TABLE public.mjesto;
       public         heap    postgres    false            ?            1259    17285    osoba    TABLE     ?   CREATE TABLE public.osoba (
    ime character varying(25) NOT NULL,
    prezime character varying(25) NOT NULL,
    oib character varying(11) NOT NULL
);
    DROP TABLE public.osoba;
       public         heap    postgres    false            ?            1259    17290    postaja    TABLE       CREATE TABLE public.postaja (
    imepostaja character varying(50) NOT NULL,
    id character varying(10) NOT NULL,
    elevacija integer NOT NULL,
    mjesto integer NOT NULL,
    geografska_duzina double precision NOT NULL,
    geografska_sirina double precision NOT NULL
);
    DROP TABLE public.postaja;
       public         heap    postgres    false            ?            1259    17295    zupanija    TABLE     t   CREATE TABLE public.zupanija (
    sifzupanija smallint NOT NULL,
    nazzupanija character varying(40) NOT NULL
);
    DROP TABLE public.zupanija;
       public         heap    postgres    false            6           2604    17344    mjerenje mjerenjeID    DEFAULT     ~   ALTER TABLE ONLY public.mjerenje ALTER COLUMN "mjerenjeID" SET DEFAULT nextval('public."mjerenje_mjerenjeID_seq"'::regclass);
 D   ALTER TABLE public.mjerenje ALTER COLUMN "mjerenjeID" DROP DEFAULT;
       public          postgres    false    205    204            ?          0    17326    mjerenje 
   TABLE DATA           O   COPY public.mjerenje (tlak, vrijeme, datum, postaja, "mjerenjeID") FROM stdin;
    public          postgres    false    204   ?"       ?          0    17358 
   mjeritelji 
   TABLE DATA           =   COPY public.mjeritelji ("idMjerenja", mjeritelj) FROM stdin;
    public          postgres    false    206   ?#       ?          0    17300    mjesto 
   TABLE DATA           =   COPY public.mjesto (pbr, nazmjesto, sifzupanija) FROM stdin;
    public          postgres    false    203   D$       ?          0    17285    osoba 
   TABLE DATA           2   COPY public.osoba (ime, prezime, oib) FROM stdin;
    public          postgres    false    200   ?$       ?          0    17290    postaja 
   TABLE DATA           j   COPY public.postaja (imepostaja, id, elevacija, mjesto, geografska_duzina, geografska_sirina) FROM stdin;
    public          postgres    false    201   &       ?          0    17295    zupanija 
   TABLE DATA           <   COPY public.zupanija (sifzupanija, nazzupanija) FROM stdin;
    public          postgres    false    202   I'       ?           0    0    mjerenje_mjerenjeID_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."mjerenje_mjerenjeID_seq"', 10, true);
          public          postgres    false    205            B           2606    17349    mjerenje mjerenje_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.mjerenje
    ADD CONSTRAINT mjerenje_pkey PRIMARY KEY ("mjerenjeID");
 @   ALTER TABLE ONLY public.mjerenje DROP CONSTRAINT mjerenje_pkey;
       public            postgres    false    204            @           2606    17304    mjesto mjesto_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.mjesto
    ADD CONSTRAINT mjesto_pkey PRIMARY KEY (pbr);
 <   ALTER TABLE ONLY public.mjesto DROP CONSTRAINT mjesto_pkey;
       public            postgres    false    203            8           2606    17289    osoba osoba_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT osoba_pkey PRIMARY KEY (oib);
 :   ALTER TABLE ONLY public.osoba DROP CONSTRAINT osoba_pkey;
       public            postgres    false    200            <           2606    17294    postaja postaja_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.postaja
    ADD CONSTRAINT postaja_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.postaja DROP CONSTRAINT postaja_pkey;
       public            postgres    false    201            :           2606    17320    osoba unique_OIB 
   CONSTRAINT     L   ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT "unique_OIB" UNIQUE (oib);
 <   ALTER TABLE ONLY public.osoba DROP CONSTRAINT "unique_OIB";
       public            postgres    false    200            >           2606    17299    zupanija županije_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.zupanija
    ADD CONSTRAINT "županije_pkey" PRIMARY KEY (sifzupanija);
 C   ALTER TABLE ONLY public.zupanija DROP CONSTRAINT "županije_pkey";
       public            postgres    false    202            F           2606    17361    mjeritelji fkey_mjerenje    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mjeritelji
    ADD CONSTRAINT fkey_mjerenje FOREIGN KEY ("idMjerenja") REFERENCES public.mjerenje("mjerenjeID");
 B   ALTER TABLE ONLY public.mjeritelji DROP CONSTRAINT fkey_mjerenje;
       public          postgres    false    206    2882    204            G           2606    17366    mjeritelji fkey_mjeritelj    FK CONSTRAINT     {   ALTER TABLE ONLY public.mjeritelji
    ADD CONSTRAINT fkey_mjeritelj FOREIGN KEY (mjeritelj) REFERENCES public.osoba(oib);
 C   ALTER TABLE ONLY public.mjeritelji DROP CONSTRAINT fkey_mjeritelj;
       public          postgres    false    2872    206    200            E           2606    17337    mjerenje fkey_postaja    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mjerenje
    ADD CONSTRAINT fkey_postaja FOREIGN KEY (postaja) REFERENCES public.postaja(id) NOT VALID;
 ?   ALTER TABLE ONLY public.mjerenje DROP CONSTRAINT fkey_postaja;
       public          postgres    false    2876    201    204            C           2606    17321    postaja mjesto_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.postaja
    ADD CONSTRAINT mjesto_fkey FOREIGN KEY (mjesto) REFERENCES public.mjesto(pbr) NOT VALID;
 =   ALTER TABLE ONLY public.postaja DROP CONSTRAINT mjesto_fkey;
       public          postgres    false    2880    203    201            D           2606    17305    mjesto mjesto_sifzupanija_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mjesto
    ADD CONSTRAINT mjesto_sifzupanija_fkey FOREIGN KEY (sifzupanija) REFERENCES public.zupanija(sifzupanija) NOT VALID;
 H   ALTER TABLE ONLY public.mjesto DROP CONSTRAINT mjesto_sifzupanija_fkey;
       public          postgres    false    2878    203    202            ?   ?   x?U?;r?@И???h~3?m?T??ϱLYe?bM`V?Y?%N|Ȥ?34c?t? 3(????Z!???w??,?8???|?K4d??n?[u?ǝ;?àd[???^"?^???????f?Jq]\?R?n???-??h^Y?-?o?>cJcѺ?T??=vV??š?#37ry???x????F      ?   ?   x?]λmP???l~?]????|)(?l??*?\?N;??J?y?J@e\??iz?i??v"X??yY?j?3?Oj?????+?
 ?S??B?????5?7?~?S?????$Od;a?x?1?a?;_U????()?      ?   }   x??A
1??urI?h]??Jt-n"?R;X?8s??l??{???????20?F!?K^??E?'84ok?"?l{??/?9D?@c??W?]Q?????Y~?O???? ?V??j??eO???"???"?      ?   %  x?-?=n?0?g?0I?PE?h?"S5
ǎU?v?\?S???%?W#9???#?IC?a?????E?F?j?EXt?j??I??&?kӧ??? ??x?8v?E	?Y_B<?|??h??c&#?cP??\????{?d?????c_?p?H?XI?c?O0??????q?U?M?m???0ol?	?ܥU??bAS?????p???e???ܦX*SZU)w?+C??3蜳(??????mܷ?,?????o????_???ȳs?ʧ>?*?????Z]?????????l?      ?   3  x?M?Mj?0F??)r?ɲ${9??R((t?M`B??<??O?{U?@/?0z~????o?vcw_?????^(Ke?.rQ<?=?d???????q:?9&a??+????p??~?!PJ?T?s?????m?H?Fr???? ?@???1j???,??TKDR?14??>?H?|????2??C??c?we>?)?K?????a?	??x????:??r&???e?+???ޗ???h????۷???~???|?ma? ?b?
??kM?);56p???????:?;?-??j5??F?Y?W Al?|?4@?i?      ?   ?   x?32??M=213???8;?˄?;?('?,?H/?gh?\??YR????????X??Re?锕
RU?I???O?k74??/?Jj
'%?e?E?8?J?aʋ?2?RsA?F???E?)
Q??E?I\1z\\\ ??2-     