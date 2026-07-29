create table if not exists public.projects (
  id text primary key,
  category jsonb not null default '{}'::jsonb,
  name jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  url text not null,
  image_url text not null,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);
create table if not exists public.pricing (
  package text primary key check (package in ('starter','business','premium')),
  price text not null,
  currency text not null default 'ກີບ',
  updated_at timestamptz not null default now()
);
insert into public.projects(id,category,name,description,url,image_url,sort_order) values
('tum-pa-guay','{"lo":"ເວັບໄຊຕ໌ຮ້ານອາຫານ","th":"เว็บไซต์ร้านอาหาร","en":"Restaurant Website"}','{"lo":"ຮ້ານຕຳຕູບປ່າກ້ວຍ","th":"ร้านตำตูบป่าก้วย","en":"Tum Pa Guay Restaurant"}','{"lo":"ເວັບໄຊຕ໌ຮ້ານອາຫານ ພ້ອມເມນູ ແຜນທີ່ ປຸ່ມຕິດຕໍ່ ແລະ ຮອງຮັບຫຼາຍພາສາ","th":"เว็บไซต์ร้านอาหาร พร้อมเมนู แผนที่ ปุ่มติดต่อ และรองรับหลายภาษา","en":"A restaurant website with menu, map, contact actions and multilingual support."}','https://nutthaphon5599.github.io/tum-pa-guay-restaurant-6.2/','assets/portfolio.jpg',0)
on conflict (id) do nothing;
insert into public.pricing(package,price,currency) values ('starter','200.000','ກີບ'),('business','500.000','ກີບ'),('premium','800.000','ກີບ') on conflict (package) do nothing;
alter table public.projects enable row level security;alter table public.pricing enable row level security;
drop policy if exists "Public can read projects" on public.projects;create policy "Public can read projects" on public.projects for select using (true);
drop policy if exists "Admins can write projects" on public.projects;create policy "Admins can write projects" on public.projects for all to authenticated using (true) with check (true);
drop policy if exists "Public can read pricing" on public.pricing;create policy "Public can read pricing" on public.pricing for select using (true);
drop policy if exists "Admins can write pricing" on public.pricing;create policy "Admins can write pricing" on public.pricing for all to authenticated using (true) with check (true);
insert into storage.buckets(id,name,public) values ('portfolio','portfolio',true) on conflict (id) do update set public=true;
drop policy if exists "Public portfolio images" on storage.objects;create policy "Public portfolio images" on storage.objects for select using (bucket_id='portfolio');
drop policy if exists "Admins upload portfolio images" on storage.objects;create policy "Admins upload portfolio images" on storage.objects for insert to authenticated with check (bucket_id='portfolio');
drop policy if exists "Admins update portfolio images" on storage.objects;create policy "Admins update portfolio images" on storage.objects for update to authenticated using (bucket_id='portfolio') with check (bucket_id='portfolio');
drop policy if exists "Admins delete portfolio images" on storage.objects;create policy "Admins delete portfolio images" on storage.objects for delete to authenticated using (bucket_id='portfolio');
